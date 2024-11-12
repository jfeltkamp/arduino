import horizon from './horizon.js';

class InitFocusController {

  constructor() {
    this.stick = document.getElementById("joys-slide");

    if (this.stick) {
      this.horizon = horizon;
      // location from which drag begins, used to calculate offsets
      this.dragStart = null;

      // track touch identifier in case multiple joythis.sticks present
      this.touchId = null;

      // Processing data.
      this.maxDistance = 230;
      this.deadZone = 8;
      this.active = false;
      this.value = { f: 0 };
      this.counter = 0;
      this.prev = { f: 0 };

      // Debouncing control submission.
      this.debounceTimer = null;
      this.debounceTimeout = 50;

      this.stick.addEventListener('mousedown', (e) => { this._handleDown(e) });
      this.stick.addEventListener('touchstart', (e) => { this._handleDown(e) });
      document.addEventListener('mousemove', (e) => { this._handleMove(e) }, { passive: false });
      document.addEventListener('touchmove', (e) => { this._handleMove(e) }, { passive: false });
      document.addEventListener('mouseup', (e) => { this._handleUp(e) });
      document.addEventListener('touchend', (e) => { this._handleUp(e) });
    }
  }

  /**
   * Handles mouse/touch down event.
   *
   * Inits the handle animation.
   *
   * @param event
   *   The mouse/touch move event.
   *  @private
   */
  _handleDown(event){
    this.active = true;
    // all drag movements are instantaneous
    this.stick.style.transition = '0s';
    // touch event fired before mouse event; prevent redundant mouse event from firing
    event.preventDefault();
    this.dragStart = (event.changedTouches) ?
      { y: event.changedTouches[0].clientY } :
      { y: event.clientY };

    // if this is a touch event, keep track of which one
    if (event.changedTouches) {
      this.touchId = event.changedTouches[0].identifier;
    }
  }

  /**
   * Handles mouse/touch move events.
   *
   * Calculates the position of the joystick handle and follow mouse/touch pointer.
   *
   * @param event
   *   The mouse/touch move event.
   *  @private
   */
  _handleMove(event){
    if ( !this.active ) return;
    event.preventDefault();

    // if this is a touch event, make sure it is the right one
    // also handle multiple simultaneous touchmove events
    let touchmoveId = null;
    if (event.changedTouches)
    {
      for (let i = 0; i < event.changedTouches.length; i++)
      {
        if (this.touchId === event.changedTouches[i].identifier)
        {
          touchmoveId = i;
          event.clientY = event.changedTouches[i].clientY;
        }
      }

      if (touchmoveId == null) return;
    }

    // Calculate handle position, to stick on the mouse.
    // SVG might be scaled, so we have to calculate the scaled value.
    const rect = this.stick.getBoundingClientRect();
    const scale = (rect) ? Math.round(10000 / rect.width) / 100 : 1;
    const yDiff = event.clientY - this.dragStart.y;
    const distance = (yDiff >= 0) ? Math.min(this.maxDistance, (yDiff * scale)) : Math.max(-this.maxDistance, (yDiff * scale));

    // move this.stick image to new position
    this.stick.style.transform = `translateY(${distance}px)`;

    // deadZone adjustment
    const yPercent = (Math.abs(distance) > this.deadZone) ? parseFloat((distance / this.maxDistance).toFixed(4)) : 0;

    this.value = { "f": yPercent };
    this._loop()
  }

  /**
   * Handles mouseUp/touchUp event.
   *
   * @param event
   * @private
   */
  _handleUp(event){
    if ( !this.active ) return;
    event.preventDefault();

    // if this is a touch event, make sure it is the right one
    if (event.changedTouches && (this.touchId !== event.changedTouches[0].identifier)) return;

    // transition the joystick position back to center
    this.stick.style.transition = '.2s';
    this.stick.style.transform = `translateY(0px)`;

    // reset everything
    this.value = { f: 0 };
    this.touchId = null;
    this.active = false;
  }

  /**
   * Sends data update to the application server.
   *
   * @private
   */
  _sendUpdate() {
    const focus = Math.round(511.5 - this.value.f * 511.5);
    fetch(`/focus/${focus}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        this.horizon.initUpdate(data)
      });
  }

  /**
   * Debounce submission of data update for fast series of mouse/touch move events.
   *
   * @param mainFunction
   *   Function to be executed debounced to 1-2 per second.
   * @returns {(function(...[*]): void)|*}
   * @private
   */
  _debounce(mainFunction) {
    return (...args) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        mainFunction(...args);
      }, this.debounceTimeout);
    };
  };

  /**
   * Triggered whenever the joystick moved.
   *
   * @private
   */
  _update() {
    if (this.value.f !== this.prev.f) {
      this.prev = {...this.value};
      const workOnChange = this._debounce(() => { this._sendUpdate() });
      workOnChange()
    }
  }

  /**
   * Creates an optimized animation loop to have sync with monitor.
   *
   * @private
   */
  _loop(){
    if (this.active) {
      this.frame = requestAnimationFrame(() => { this._loop() });
    } else {
      cancelAnimationFrame(this.frame);
    }
    this._update();
  }
}

new InitFocusController();

export default class JoystickController {

  constructor(joystick, callback) {
    this.stick = joystick;

    if (this.stick) {
      this.callback = callback;
      // location from which drag begins, used to calculate offsets
      this.dragStart = null;

      // track touch identifier in case multiple joythis.sticks present
      this.touchId = null;

      // Processing data.
      this.maxDistance = 200;
      this.deadZone = 8;
      this.active = false;
      this.value = { x: 0, y: 0 };
      this.counter = 0;
      this.prev = { x: 0, y: 0 };

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

  destroy() {
    this.stick.removeEventListener('mousedown', (e) => { this._handleDown(e) });
    this.stick.removeEventListener('touchstart', (e) => { this._handleDown(e) });
    document.removeEventListener('mousemove', (e) => { this._handleMove(e) });
    document.removeEventListener('touchmove', (e) => { this._handleMove(e) });
    document.removeEventListener('mouseup', (e) => { this._handleUp(e) });
    document.removeEventListener('touchend', (e) => { this._handleUp(e) });
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
      { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY } :
      { x: event.clientX, y: event.clientY };

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
          event.clientX = event.changedTouches[i].clientX;
          event.clientY = event.changedTouches[i].clientY;
        }
      }

      if (touchmoveId == null) return;
    }

    // SVG might be scaled, so we have to calculate the scaled value.
    const rect = this.stick.getBoundingClientRect();
    const scale = (rect) ? Math.round(16000 / rect.width) / 100 : 1;

    // Calculate handle position, to stick on the mouse.
    const xDiff = event.clientX - this.dragStart.x;
    const yDiff = event.clientY - this.dragStart.y;
    const angle = Math.atan2(yDiff, xDiff);
    const distance = Math.min(this.maxDistance, Math.hypot(xDiff, yDiff) * scale);
    const xPosition = distance * Math.cos(angle);
    const yPosition = distance * Math.sin(angle);

    // move this.stick image to new position
    this.stick.style.transform = `translate(${xPosition}px, ${yPosition}px)`;

    // deadZone adjustment
    const distance2 = (distance < this.deadZone) ? 0 : this.maxDistance / (this.maxDistance - this.deadZone) * (distance - this.deadZone);
    const xPosition2 = distance2 * Math.cos(angle);
    const yPosition2 = distance2 * Math.sin(angle);
    const xPercent = parseFloat((xPosition2 / this.maxDistance).toFixed(4));
    const yPercent = parseFloat((yPosition2 / this.maxDistance).toFixed(4));

    this.value = { x: xPercent, y: yPercent };
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

    // if this is a touch event, make sure it is the right one
    if (event.changedTouches && (this.touchId !== event.changedTouches[0].identifier)) return;

    // transition the joystick position back to center
    this.stick.style.transition = '.2s';
    this.stick.style.transform = `translate3d(0px, 0px, 0px)`;

    // reset everything
    this.value = { x: 0, y: 0 };
    this.touchId = null;
    this.active = false;
  }

  /**
   * Sends data update to the application server.
   *
   * @private
   */
  _sendUpdate() {
    const x_axis = Math.round(511.5 + this.value.x * 511.5);
    const y_axis = Math.round(511.5 + this.value.y * 511.5);
    this.callback(`/joystick/${x_axis}/${y_axis}`);
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
    if ((this.value.x !== this.prev.x) || (this.value.y !== this.prev.y)) {
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

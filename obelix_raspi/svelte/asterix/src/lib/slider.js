
export default class SliderController {

  constructor(slide, callback, initialValue) {
    this.slide = slide;

    if (this.slide) {
      this.callback = callback;
      // location from which drag begins, used to calculate offsets
      this.dragStart = null;

      // track touch identifier in case multiple joythis.sticks present
      this.touchId = null;

      // Fixed settings
      this.maxDistance = 690;
      this.precision = 6;

      // Processing data.
      this.active = false;
      this.value = 0;
      this.counter = 0;
      this.prev = 0;

      // Calc currDistance from state given by component value
      initialValue = parseFloat(initialValue);
      initialValue = (initialValue > 0) ? Math.min(initialValue, 1) : 0;
      this.currDistance =  initialValue * this.maxDistance;

      this.setHandleValue(this.currDistance);
      this.progressDistance = 0;

      this.slide.addEventListener('mousedown', (e) => { this._handleDown(e) });
      this.slide.addEventListener('touchstart', (e) => { this._handleDown(e) });
      document.addEventListener('mousemove', (e) => { this._handleMove(e) }, { passive: false });
      document.addEventListener('touchmove', (e) => { this._handleMove(e) }, { passive: false });
      document.addEventListener('mouseup', (e) => { this._handleUp(e) });
      document.addEventListener('touchend', (e) => { this._handleUp(e) });
    }
  }

  destroy() {
    this.slide.removeEventListener('mousedown', (e) => { this._handleDown(e) });
    this.slide.removeEventListener('touchstart', (e) => { this._handleDown(e) });
    document.removeEventListener('mousemove', (e) => { this._handleMove(e) });
    document.removeEventListener('touchmove', (e) => { this._handleMove(e) });
    document.removeEventListener('mouseup', (e) => { this._handleUp(e) });
    document.removeEventListener('touchend', (e) => { this._handleUp(e) });
  }

  /**
   * Sends data update to the application server.
   *
   * @private
   */
  _sendUpdate() {
    const value = this.value;
    this.callback(value);
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
    this.slide.style.transition = '0s';
    // touch event fired before mouse event; prevent redundant mouse event from firing
    event.preventDefault();
    this.dragStart = (event.changedTouches) ?
      event.changedTouches[0].clientX :
      event.clientX;

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
          event.clientX = event.changedTouches[i].clientX;
        }
      }

      if (touchmoveId == null) return;
    }

    // Calculate handle position, to stick on the mouse.
    // SVG might be scaled, so we have to calculate the scaled value.
    const rect = this.slide.getBoundingClientRect();
    const scale = (rect) ? Math.round(6000 / rect.width) / 100 : 1;
    const xDiff = this.currDistance + ((event.clientX - this.dragStart) * scale);
    const distance = (xDiff >= 0) ? Math.min(this.maxDistance, xDiff) : 0;
    this.progressDistance = distance;
    this.setHandleValue(distance);
  }

  /**
   * Set value (position) of handle.
   *
   * @param value
   */
  setHandleValue(value) {
    // move this.stick image to new position
    this.slide.style.transform = `translateX(${value}px)`;
    this.value = parseFloat((value / this.maxDistance).toFixed(this.precision));
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

    this._sendUpdate()
    // reset everything
    this.currDistance = this.progressDistance;
    this.touchId = null;
    this.active = false;
  }

}

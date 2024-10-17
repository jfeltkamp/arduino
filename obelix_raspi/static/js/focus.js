
class InitFocusController {

  constructor() {
    // Get UI elements
    this.rangeInput = document.getElementById('focus');
    this.rangeMeter = document.getElementById('range-meter');
    this.focusStatus = document.getElementById('focus-status');

    if (this.rangeInput) {
      // Animate settings
      this.submissionCounter = 0;
      this.duration = .3;
      this.totalFrame = this.duration * 60;
      this.increment = 1 / this.totalFrame;
      this._reset();

      // Sending data
      this.debounceDelay = 50;

      // Init event handlers
      this.rangeInput.addEventListener('change', () => this._handleChangeEvent());
      this.rangeInput.addEventListener('input', () => this._handleInputEvent());
    }
    else {
      console.error('No range input found.')
      return false;
    }
  }

  /**
   * Input event handler for the range input event.
   *
   * @private
   */
  _handleInputEvent() {
    const debouncedUpdate = this._debounce(() => this._sendDebouncedUpdate());
    debouncedUpdate()
  }

  /**
   * Push input data to application server.
   *
   * @private
   */
  _sendDebouncedUpdate() {
    this.submissionCounter++;
    const speed_z = this.rangeInput.value
    document.getElementById("status-focus").innerText = `Focus (${this.submissionCounter}): ${speed_z}` ;
    fetch(`/focus/${speed_z}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        const speed = data?.focus?.speed;
        if (speed && this.focusStatus) {
          this.focusStatus.value = speed;
        }
        const position = data?.focus?.position;
        if (position && this.rangeMeter) {
          this.rangeMeter.style = `y:${100 - position}%`;
        }
      })
  }

  /**
   * Initializes the animation of the range input.
   *
   * When user releases the handle, it returns to the center on its own.
   *
   * @private
   */
  _handleChangeEvent() {
    if (!this.blocked) {
      this.animOrig = parseInt(this.rangeInput.value, 10);
      const target = this.animOrig - 511;
      this._anim(target);
    }
  }

  /**
   * Controls the Cubic-Bezier timed value of animation steps.
   *
   * @private
   */
  _bezier(t, final){
    return 3 * (1-t) * Math.pow(t,2) * final + Math.pow(t,3) * final;
  }

  /**
   * Reset values to default after input range animation.
   *
   * @private
   */
  _reset() {
    this.currentTime  = 0;
    this.frame = null;
    this.blocked = false
    this.animOrig = 0;
  }

  /**
   * Analog animation of range input, that flips back when released.
   *
   * @private
   */
  _anim(to){
    let currentValue = this._bezier(this.currentTime, to);
    this.rangeInput.value = this.animOrig - Math.round(currentValue)
    if (this.currentTime * this.duration >= this.duration) {
      cancelAnimationFrame(this.frame);
      this._reset();
      let event = new CustomEvent("input");
      this.rangeInput.dispatchEvent(event);
    }
    else {
      this.blocked = true;
      this.currentTime += this.increment;
      this.frame = requestAnimationFrame(() => {
        this._anim(to)
      });
    }
  }

  /**
   * Debounce fast series of input events fired from range input.
   *
   * @param mainFunction
   * @returns {(function(...[*]): void)|*}
   */
  _debounce(mainFunction) {
    const self = this;
    return function (...args) {
      clearTimeout(self.bounceTimer);
      self.bounceTimer = setTimeout(() => {
        mainFunction(...args);
      }, self.debounceDelay);
    };
  };
}

new InitFocusController();

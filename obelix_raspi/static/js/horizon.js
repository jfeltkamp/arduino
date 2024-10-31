/**
 * Visual artificial horizon.
 */
class Horizon {

  constructor() {
    this.compass = document.getElementById('compass');
    this.azimuthSphere = document.getElementById('azimuth-sphere');
    this.azimuthText = document.getElementById('azimuth-text');
    this.focusRangeMeter = document.getElementById('focus-range-meter');

    this.altitudeVisual = document.getElementById('altitude-visual');
    this.altitudeText = document.getElementById('altitude-text');

    // Default config to be safe all values are set. Overwritten right with getArduinoConfig.
    this.conf = {
      x: 0,
      y: 0,
      f: 0,
      deg_x: 0.0,
      deg_y: 0.0,
      dx: 1,
      dy: -1,
      df: 1,
      acc: 1000,
      spr: 80000,
      mpa: 20000,
      minpx: -20000,
      maxpx: 20000,
      mpf: 5000,
      vx: 0,
      vy: 0,
      va1: 100,
      va2: 1500,
      vf: 0,
      vf1: 100,
      vf2: 1500,
    }
    this.timer = null;
    this.timeout = 250;
    this.getArduinoConfig();
  }

  /**
   * Initial load of the Arduino config.
   */
  getArduinoConfig() {
    fetch(`/get-config`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (typeof data === 'object') {
          const vDefaults = {vf: 0, vx: 0, vy: 0 };
          this.conf = { ...this.conf, ...data, ...vDefaults }
        }
        console.log('UPDATED', this.conf);
        this.updateSvg();
      });
  }

  initUpdate(data) {
    this.setPosition(data);
    this.updateSvg();

    if ((typeof data.vx === 'number') || (typeof data.vy === 'number') || (typeof data.vf === 'number')) {
      this.conf.vx = (typeof data.vx === 'number') ? data.vx : this.conf.vx;
      this.conf.vy = (typeof data.vy === 'number') ? data.vy : this.conf.vy;
      this.conf.vf = (typeof data.vf === 'number') ? data.vf : this.conf.vf;
      this.runSpeed();
    }
  }

  /**
   * Refresh the horizon SVG, based on current conf.
   */
  updateSvg() {
    // Calc
    const stepsF = this.conf.f + this.conf.pmf;
    const rangeF = this.conf.pmf - (this.conf.pmf / Math.pow((1.5/this.conf.pmf) * stepsF + 1,2));
    const rateF = rangeF / this.conf.pmf;
    this.focusRangeMeter.style.y = `${(1-rateF) * 133}%`;

    // Set X axis params in SVG.
    this.azimuthText.textContent = `${this.conf.deg_x}°`;
    this.compass.style.transform = `rotate(${this.conf.deg_x}deg)`;

    // Set Y axis params in SVG.
    const azimuthLift = Math.round(this.conf.deg_y * 400 / 90);
    this.azimuthSphere.style.transform = `translate(0, ${azimuthLift}px)`;
    this.altitudeVisual.style.transform = `rotate(${this.conf.deg_y}deg)`;
    this.altitudeText.textContent = `∠ ${this.conf.deg_y}°`;
  }

  /**
   * Get current position.
   *
   * @returns {{f: number, x: number, y: number}}
   */
  getPosition() {
    return {
      "x": this.conf.x,
      "y": this.conf.y,
      "f": this.conf.f,
    }
  }

  /**
   * Sets new X-Y-F position and re-calculates params derived from the positions.
   *
   * @param newPos
   */
  setPosition(newPos) {
    if (typeof newPos.x === 'number') {
      this.conf.x = newPos.x;
      this.conf.deg_x = Math.round(newPos.x / this.conf.spr * 36000) / 100;
      if (this.conf.deg_x < 0) {
        this.conf.deg_x = 360 + this.conf.deg_x;
      }
    }
    if (typeof newPos.y === 'number') {
      this.conf.y = newPos.y;
      this.conf.deg_y = Math.round(newPos.y / this.conf.spr * 36000) / 100;
    }
    if (typeof newPos.f === 'number') {
      this.conf.f = newPos.f;
      if (this.conf.f >  this.conf.pmf) {
        this.conf.f = this.conf.pmf;
      }
      if (this.conf.f < -this.conf.pmf) {
        this.conf.f = -this.conf.pmf;
      }
    }
  }

  runSpeed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const isVx = Math.abs(this.conf.vx) >= this.conf.va1;
    const isVy = Math.abs(this.conf.vy) >= this.conf.va1;
    const isVf = Math.abs(this.conf.vf) >= this.conf.vf1;
    if (isVx || isVy || isVf) {
      const newPos = {}
      newPos['x'] = (isVx) ? this.conf.x + Math.round(this.conf.vx * this.timeout / 1000) : null;
      newPos['y'] = (isVy) ? this.conf.y + Math.round(this.conf.vy * this.timeout / 1000) : null;
      newPos['f'] = (isVf) ? this.conf.f + Math.round(this.conf.vf * this.timeout / 1000) : null;
      this.setPosition(newPos);
      this.updateSvg();

      this.timer = setTimeout(() => {
        this.runSpeed();
      }, this.timeout);
    }
  }

  /**
   * Async position update.
   * May be slow because waits until Arduino has stopped steppers and has sent update.
   */
  refreshPosition() {
    fetch(`/refresh-position`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (typeof data === 'object') {
          this.conf = { ...this.conf, ...data }
        }
        this.updateSvg();
    });
  }

  dirUpdate(dir, length) {
    if (dir === 'left') {
      this.initUpdate({ "x": this.conf.x + length * -this.conf.dx })
    }
    else if (dir === 'right') {
      this.initUpdate({ "x": this.conf.x + length * this.conf.dx })
    }
    else if (dir === 'up') {
      this.initUpdate({ "y": this.conf.y + length * -this.conf.dy })
    }
    else if (dir === 'down') {
      this.initUpdate({ "y": this.conf.y + length * this.conf.dy })
    }
    else if (dir === 'focus') {
      this.initUpdate({ "f": this.conf.x + length * this.conf.df })
    }
  }
}

const horizonInst = new Horizon();
export default horizonInst;
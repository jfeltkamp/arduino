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
      acc: 1000,
      spr: 80000,
      pmf: 5000,
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
    this.conf.x = (typeof data.x === 'number') ? data.x : this.conf.x;
    this.conf.y = (typeof data.y === 'number') ? data.y : this.conf.y;
    this.conf.f = (typeof data.f === 'number') ? data.f : this.conf.f;
    this.updateSvg();

    this.conf.vx = (typeof data.vx === 'number') ? data.vx : this.conf.vx;
    this.conf.vy = (typeof data.vy === 'number') ? data.vy : this.conf.vy;
    this.conf.vf = (typeof data.vf === 'number') ? data.vf : this.conf.vf;
    this.runSpeed();
  }

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

  runSpeed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const isVx = Math.abs(this.conf.vx) >= this.conf.va1;
    const isVy = Math.abs(this.conf.vy) >= this.conf.va1;
    const isVf = Math.abs(this.conf.vf) >= this.conf.vf1;
    if (isVx || isVy || isVf) {
      if (isVx) {
        this.conf.x = this.conf.x + Math.round(this.conf.vx * this.timeout / 1000);
        this.conf.deg_x = Math.round(this.conf.x / this.conf.spr * 36000) / 100;
        if (this.conf.deg_x < 0) {
          this.conf.deg_x = 360 + this.conf.deg_x;
        }
      }
      if (isVy) {
        this.conf.y = this.conf.y + Math.round(this.conf.vy * this.timeout / 1000);
        this.conf.deg_y = Math.round(this.conf.y / this.conf.spr * 36000) / 100;
      }
      if (isVf) {
        this.conf.f = this.conf.f + Math.round(this.conf.vf * this.timeout / 1000);
        if (this.conf.f >  this.conf.pmf) {
          this.conf.f = this.conf.pmf;
        }
        if (this.conf.f < -this.conf.pmf) {
          this.conf.f = -this.conf.pmf;
        }
      }
      this.updateSvg();

      this.timer = setTimeout(() => {
        this.runSpeed();
      }, this.timeout);
    }
    else {
      this.refreshPosition();
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
}

const horizonInst = new Horizon();
export default horizonInst;
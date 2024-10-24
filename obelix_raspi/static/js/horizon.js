

class Horizon {
  constructor() {
    this.compass = document.getElementById('compass');
    this.azimuthSphere = document.getElementById('azimuth-sphere');
    this.azimuthText = document.getElementById('azimuth-text');
    this.focusRangeMeter = document.getElementById('focus-range-meter');

    this.altitudeVisual = document.getElementById('altitude-visual');
    this.altitudeText = document.getElementById('altitude-text');
    this.x = 0;
    this.y = 0;
    this.f = -2500;
    this.pmf = 5000;
    this.vx = 0;
    this.vy = 0;
    this.va1 = 100;
    this.va2 = 1500;
    this.vf = 0;
    this.vf1 = 100;
    this.vf2 = 1500;
    this.timer = null;
    this.timeout = 250;
    this.spr = 80000;
    this.updateSvg();
  }

  initUpdate(data) {
    this.x = (typeof data.x === 'number') ? data.x : this.x;
    this.y = (typeof data.y === 'number') ? data.y : this.y;
    this.f = (typeof data.f === 'number') ? data.f : this.f;
    this.updateSvg();

    this.vx = (typeof data.vx === 'number') ? data.vx : this.vx;
    this.vy = (typeof data.vy === 'number') ? data.vy : this.vy;
    this.vf = (typeof data.vf === 'number') ? data.vf : this.vf;
    this.runSpeed();
  }

  updateSvg() {

    // Calc
    const stepsF = this.f + this.pmf;
    const rangeF = this.pmf - (this.pmf / Math.pow((1.5/this.pmf) * stepsF + 1,2));
    const rateF = rangeF / this.pmf;
    this.focusRangeMeter.style.y = `${(1-rateF) * 133}%`;

    const degX = Math.round(this.x / this.spr * 36000) / 100;
    const degY = Math.round(this.y / this.spr * 36000) / 100;
    // Set X axis params in SVG.
    this.azimuthText.textContent = `${degX}°`;
    this.compass.style.transform = `rotate(${degX}deg)`;

    // Set Y axis params in SVG.
    const azimuthLift = Math.round(degY * 400 / 90);
    this.azimuthSphere.style.transform = `translate(0, ${azimuthLift}px)`;
    this.altitudeVisual.style.transform = `rotate(${degY}deg)`;
    this.altitudeText.textContent = `∠ ${degY}°`;
  }

  runSpeed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (Math.abs(this.vx) >= this.va1 || Math.abs(this.vy) >= this.va1 || Math.abs(this.vf) >= this.vf1) {
      if (Math.abs(this.vx) >= this.va1) {
        this.x = this.x + Math.round(this.vx * this.timeout / 1000);
      }
      if (Math.abs(this.vy) >= this.va1) {
        this.y = this.y + Math.round(this.vy * this.timeout / 1000);
      }
      if (Math.abs(this.vf) >= this.vf1) {
        this.f = this.f + Math.round(this.vf * this.timeout / 1000);
        if (this.f >  this.pmf) {
          this.f = this.pmf;
        }
        if (this.f < -this.pmf) {
          this.f = -this.pmf;
        }
      }
      this.updateSvg();

      this.timer = setTimeout(() => {
        this.runSpeed();
      }, this.timeout);
    }
  }

}

const horizonInst = new Horizon();
export default horizonInst;
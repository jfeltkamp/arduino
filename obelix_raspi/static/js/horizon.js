

export class Horizon {
  constructor() {
    this.azimuthSphere = document.getElementById('azimuth-sphere');
    this.azimuthText = document.getElementById('azimuth-text');

    this.altitudeVisual = document.getElementById('altitude-visual');
    this.altitudeText = document.getElementById('altitude-text');
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.va1 = 100;
    this.vf1 = 100;
    this.timer = null;
    this.timeout = 250;
    this.spr = 80000;
    this.updateSvg(0, 0);
  }

  initUpdate(data) {
    this.x = (typeof data.x === 'number') ? data.x : this.x;
    this.y = (typeof data.y === 'number') ? data.y : this.y;
    this.updateSvg();

    this.vx = (typeof data.vx === 'number') ? data.vx : this.vx;
    this.vy = (typeof data.vy === 'number') ? data.vy : this.vy;
    this.runSpeed();
  }

  updateSvg() {
    const degX = Math.round(this.x / this.spr * 36000) / 100;
    const degY = Math.round(this.y / this.spr * 36000) / 100;

    this.azimuthText.textContent = `${degX}°`;
    const azimuthLift = Math.round(degY * 400 / 90);
    this.azimuthSphere.style.transform = `translate(0, ${azimuthLift}px)`;
    this.altitudeVisual.style.transform = `rotate(${degY}deg)`;
    this.altitudeText.textContent = `${degY}°`;
  }

  runSpeed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (Math.abs(this.vx) >= this.va1 || Math.abs(this.vy) >= this.va1) {
      if (Math.abs(this.vx) >= this.va1) {
        this.x = this.x + Math.round(this.vx * this.timeout / 1000);
      }
      if (Math.abs(this.vy) >= this.va1) {
        this.y = this.y + Math.round(this.vy * this.timeout / 1000);
      }
      this.updateSvg();

      this.timer = setTimeout(() => {
        this.runSpeed();
      }, this.timeout);
    }
  }

}

export default class AdjustController {
  constructor(adjust, callback) {
    this.adjust = adjust;

    if (this.adjust) {
      this.callback = callback
      const aDeg = 80000 / 360;
      this.axisSteps = {
        "lg": Math.round(aDeg),
        "md": Math.round(aDeg / 10),
        "sm": Math.round(aDeg / 100)
      }

      this.adjust.addEventListener('mouseup', (e) => {
        this.sendCommand(e.target.dataset);
      });
    }
  }

  destroy() {
    this.adjust.removeEventListener('mouseup', (e) => {
      this.sendCommand(e.target.dataset);
    });
  }

  sendCommand(dataset) {
    let dir = dataset?.dir;
    let length = dataset?.len;
    if (dir && length && (typeof this.axisSteps[length] === 'number')) {
      length = this.axisSteps[length];
      if (['closer', 'further'].indexOf(dir) >= 0) {
        length = (dir === 'closer') ? -length : length;
        dir = 'focus';
      }
      this.callback(`/adjust/${dir}/${length}`);
    }
  }

}

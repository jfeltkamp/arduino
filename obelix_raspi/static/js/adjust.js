import horizon from './horizon.js';

class Adjust {
  constructor() {
    this.adjust = document.getElementById('adjust');

    if (this.adjust) {
      const aDeg = horizon.conf.spr / 360;
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
    console.log(dataset, dir, length);
    if (dir && length && (typeof this.axisSteps[length] === 'number')) {
      length = this.axisSteps[length];
      if (['closer', 'further'].indexOf(dir) >= 0) {
        length = (dir === 'closer') ? -length : length;
        dir = 'focus';
      }
      fetch(`/adjust/${dir}/${length}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
          console.log('Adjust update', dataset, data)
          horizon.initUpdate(data);
        });
    }
  }

}

new Adjust();
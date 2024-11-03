import horizon from './horizon.js';

const socket = io.connect('http://' + location.hostname + ':' + location.port);

socket.on('connect', function() {
  console.log('Websocket connected.');
});

socket.on('message', function(data) {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    horizon.initUpdate(data)
  }
});

class TelescopeStream {
  constructor() {
    this.streamElement = document.getElementById('telescope-stream');
    if (this.streamElement) {
      this.setSource();
    }
  }

  setSource() {
      this.streamElement.src = 'http://' + location.hostname + ':' + '7777/stream.mjpg?t=' + Date.now();
  }
}

new TelescopeStream()
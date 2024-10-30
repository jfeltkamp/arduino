import horizon from './horizon.js';

const socket = io.connect('http://' + location.hostname + ':' + location.port);

socket.on('connect', function() {
  console.log('Websocket connected.');
});

socket.on('message', function(data) {
  console.log(data);
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    horizon.initUpdate(data)
  }
});


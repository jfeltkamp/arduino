import { dev } from '$app/environment';
import socketIo from './socket.js'

export default function obelixAPI (path, callback){
  socketIo.emit({get: 'foo'})

  const base_path = dev ? 'http://192.168.178.33:5000/' : location.origin;
  fetch(base_path + path)
    .then(response => response.json())
    .then(data => {
      if (typeof callback === 'function') {
        callback(data);
      }
    })
}

export function obelixPost (path, postObject, callback) {
  socketIo.emitReply({post: 'foo'}, callback)

  const base_path = dev ? 'http://192.168.178.33:5000/' : location.origin;
  fetch(base_path + path, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postObject)
  })
    .then(response => response.json())
    .then(data => {
      if (callback) {
        callback(data);
      }
    });
}
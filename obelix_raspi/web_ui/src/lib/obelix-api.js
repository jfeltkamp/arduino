import { get } from 'svelte/store';
import socketIo from './socket.js';
import { locOrigin } from '$lib/data-store.js';

export default function obelixAPI (path, callback){
  socketIo.emit({get: 'foo'})

  fetch(get(locOrigin) + path)
    .then(response => response.json())
    .then(data => {
      if (typeof callback === 'function') {
        callback(data);
      }
    })
}

export function obelixPost (path, postObject, callback) {
  socketIo.emitReply({post: 'foo'}, callback)

  fetch(get(locOrigin) + path, {
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
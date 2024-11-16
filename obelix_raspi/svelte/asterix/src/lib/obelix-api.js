import { dev } from '$app/environment';

export default function obelixAPI (path, callback){
  const base_path = (dev) ? 'http://192.168.178.38:5000' : '';
  fetch(base_path + path)
    .then(response => response.json())
    .then(data => {
      if (typeof callback === 'function') {
        callback(data);
      }
    })
}

export function obelixPost (path, postObject, callback) {
  const base_path = (dev) ? 'http://192.168.178.38:5000' : '';
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
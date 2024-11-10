import { dev } from '$app/environment';

export default function obelixAPI (path, callback){
  const base_path = (dev) ? 'http://192.168.178.38:5000' : '';
  fetch(base_path + path).then(response => response.json()).then(data => { callback(data); })
}
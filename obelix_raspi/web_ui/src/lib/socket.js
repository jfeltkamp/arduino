import { io } from "socket.io-client";
import { get } from 'svelte/store';
import { locOrigin } from '$lib/data-store.js';
import { arduinoSettings } from "$lib/data-store.js";
import { browser } from "$app/environment";

class Socket {
  constructor() {
    this.enabled = false;
    if (browser && (typeof io === 'function')) {
      const host = get(locOrigin)
      this.socket = io(host);

      if (this.socket) {
        // Feedback initial connection.
        this.socket.on('connect', () => {
          this.enabled = true;
          console.log('Connected to websocket Obelix 1.0')
        });

        // Update settings.
        this.socket.on('update_settings',  (data) => {
          console.log('SOCKETio', data);
          if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
            arduinoSettings.update((storeData) => { return { ...storeData, ...data }; });
          }
        });
      }
    }
  }

  destroy() {
    this.socket.offAny();
    this.socket.disconnect();
  }

  emit(data) {
    if (this.enabled) {
      this.socket.emit('message', data)
    }
  }

  emitReply(data, callback) {
    if (this.enabled) {
      console.log('emitReply')
      this.socket.emit('message_reply', data, (err, response) => {
        console.log('emitReply response', err, response)
        if (typeof callback === "function") {
          callback(response);
        }
      })
    }
  }

}

const socketIo = new Socket()
export default socketIo;
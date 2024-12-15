import { io } from "socket.io-client"
import { arduinoSettings } from "$lib/data-store.js";
import { browser, dev } from "$app/environment";

class Socket {
  constructor() {
    this.enabled = false;
    if (browser && (typeof io === 'function')) {
      const host = (dev) ? 'http://192.168.178.33:5000' : location.origin
      this.socket = io(host);

      if (this.socket) {
        // Feedback initial connection.
        this.socket.on('connect', () => {
          this.enabled = true;
          console.log('Connected to websocket Obelix 1.0')
        });

        // Update settings.
        this.socket.on('update_settings',  (data) => {
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

  call(data) {
    if (this.enabled) {
      this.socket.emit('message', data)
    }
  }

}

const socketIo = new Socket()
export default socketIo;
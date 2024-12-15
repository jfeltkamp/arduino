import { io } from "socket.io-client"

class Socket {
  constructor() {
    this.socket = io('http://192.168.178.33:5000')
  }

  emit() {
    this.socket.emit('message', { foo: "bar"})
  }
}

const socketIo = new Socket()
export default socketIo;
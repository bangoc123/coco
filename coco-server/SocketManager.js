import { underscoreId } from './global';

let instance = null;
global.users = {};

class SocketManager {
  constructor() {
    if (!instance) {
      instance = this;
      // Set io to object
      const { io } = global;
      this.io = io;
      io.on('connection', (client) => {
        // Set client to object
        this.client = client;
        client.on('disconnect', () => {
          
        });

      });
    }
    return instance;
  }
}


export default SocketManager;

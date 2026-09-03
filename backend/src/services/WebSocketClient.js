import io from 'socket.io-client';
import { logger } from '../utils/logger.js';

const log = logger.child({ module: 'WebSocket' });

export class WebSocketClient {
  constructor(url = 'http://localhost:3001') {
    this.socket = io(url, { reconnection: true, reconnectionDelay: 100 });
    this.listeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        log.info('WebSocket connected');
        resolve();
      });
      this.socket.on('connect_error', (error) => {
        log.error('WebSocket connection error', error);
        reject(error);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    this.socket.on(event, callback);
  }

  emit(event, data) {
    return new Promise((resolve) => {
      this.socket.emit(event, data, resolve);
    });
  }

  off(event) {
    this.socket.off(event);
    this.listeners.delete(event);
  }
}

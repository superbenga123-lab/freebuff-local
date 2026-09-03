import { setupProjectEvents } from './events.js';
import { logger } from '../utils/logger.js';

const log = logger.child({ module: 'WebSocketSetup' });

export function setupWebSocket(io) {
  io.on('connection', setupProjectEvents(io));

  log.info('WebSocket server initialized');

  return io;
}

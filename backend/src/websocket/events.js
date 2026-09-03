import { logger } from '../utils/logger.js';

const log = logger.child({ module: 'WebSocketEvents' });

export function setupFileWatcherEvents(io, fileWatcher) {
  fileWatcher.on('change', (projectId, filePath) => {
    log.info('File changed', { projectId, filePath });
    io.to(`project:${projectId}`).emit('file:changed', {
      projectId,
      path: filePath,
      timestamp: new Date().toISOString()
    });
  });
}

export function setupProjectEvents(io) {
  return (socket) => {
    log.info('Client connected', { socketId: socket.id });

    // Join project room
    socket.on('project:join', (projectId) => {
      socket.join(`project:${projectId}`);
      log.info('Client joined project', { socketId: socket.id, projectId });
    });

    // Leave project room
    socket.on('project:leave', (projectId) => {
      socket.leave(`project:${projectId}`);
      log.info('Client left project', { socketId: socket.id, projectId });
    });

    // Bootstrap progress
    socket.on('bootstrap:start', (projectId) => {
      log.info('Bootstrap started', { projectId });
      socket.emit('bootstrap:progress', { stage: 'DISCOVERY', progress: 0 });
    });

    // Ping/pong for health check
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });

    socket.on('disconnect', () => {
      log.info('Client disconnected', { socketId: socket.id });
    });
  };
}

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSocketClient } from '../../src/services/WebSocketClient.js';
import { logger } from '../../src/utils/logger.js';

const log = logger.child({ module: 'WebSocketTests' });

describe('WebSocket Integration Tests', () => {
  let client;

  beforeAll(async () => {
    client = new WebSocketClient('http://localhost:3001');
    try {
      await client.connect();
    } catch (error) {
      log.warn('WebSocket connection failed - backend may not be running', {
        error: error.message
      });
    }
  });

  afterAll(() => {
    if (client) {
      client.disconnect();
    }
  });

  it('should connect to WebSocket server', () => {
    expect(client.socket.connected).toBe(true);
  });

  it('should handle ping/pong', async () => {
    return new Promise((resolve) => {
      client.on('pong', (data) => {
        expect(data).toHaveProperty('timestamp');
        resolve();
      });
      client.emit('ping', {});
    });
  });

  it('should join project room', async () => {
    const projectId = 'test-project-001';
    await client.emit('project:join', projectId);
    expect(client.socket.rooms.has(`project:${projectId}`)).toBe(true);
  });

  it('should receive bootstrap progress events', async () => {
    return new Promise((resolve) => {
      client.on('bootstrap:progress', (data) => {
        expect(data).toHaveProperty('stage');
        expect(data).toHaveProperty('progress');
        resolve();
      });
      client.emit('bootstrap:start', 'test-project-001');
    });
  });
});

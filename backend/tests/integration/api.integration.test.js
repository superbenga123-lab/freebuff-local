import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { app, httpServer } from '../../src/server.js';
import request from 'supertest';
import { getDatabase, closeDatabase } from '../../src/database/connection.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testProjectPath = path.join(__dirname, '../fixtures/integration-test-project');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Create test fixture
    await fs.mkdir(testProjectPath, { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'package.json'),
      JSON.stringify({ name: 'test-app', version: '1.0.0' })
    );
    await fs.mkdir(path.join(testProjectPath, 'src'), { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'src/index.js'),
      'console.log("hello");'
    );
  });

  afterAll(async () => {
    await fs.rm(testProjectPath, { recursive: true, force: true });
    closeDatabase();
  });

  describe('Health Check', () => {
    it('GET /health should return OK', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });

  describe('Control API', () => {
    it('GET /api/control/health should return backend status', async () => {
      const response = await request(app).get('/api/control/health');
      expect(response.status).toBe(200);
      expect(response.body.backend).toBe('READY');
    });
  });

  describe('Projects API', () => {
    let projectId;

    it('POST /api/projects/create should create a project', async () => {
      const response = await request(app)
        .post('/api/projects/create')
        .send({
          path: testProjectPath,
          name: 'Test Project'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('projectId');
      projectId = response.body.projectId;
    });

    it('GET /api/projects should list projects', async () => {
      const response = await request(app).get('/api/projects');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /api/projects/open should open a project', async () => {
      const response = await request(app)
        .post('/api/projects/open')
        .send({ path: testProjectPath });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('projectId');
      expect(response.body.status).toBe('BOOTSTRAPPING');
    });
  });

  describe('Files API', () => {
    let projectId;

    beforeEach(async () => {
      const openResponse = await request(app)
        .post('/api/projects/open')
        .send({ path: testProjectPath });
      projectId = openResponse.body.projectId;
    });

    it('GET /api/files/tree should return file tree', async () => {
      const response = await request(app)
        .get('/api/files/tree')
        .query({ projectId });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /api/files/read should read a file', async () => {
      const response = await request(app)
        .get('/api/files/read')
        .query({ projectId, path: 'src/index.js' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('hash');
    });

    it('POST /api/files/write should write a file', async () => {
      const response = await request(app)
        .post('/api/files/write')
        .send({
          projectId,
          path: 'src/test.js',
          content: 'console.log("test");'
        });

      expect(response.status).toBe(200);
      expect(response.body.saved).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('GET /api/nonexistent should return 404', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });

    it('GET /api/files/tree without projectId should fail', async () => {
      const response = await request(app).get('/api/files/tree');
      expect(response.status).toBe(500);
    });
  });
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { projectService } from '../../src/services/ProjectService.js';
import { getDatabase, closeDatabase } from '../../src/database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testProjectPath = path.join(__dirname, '../fixtures/test-project');

describe('ProjectService', () => {
  beforeAll(async () => {
    // Create test project fixture
    await fs.mkdir(testProjectPath, { recursive: true });
    await fs.mkdir(path.join(testProjectPath, 'src'), { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'package.json'),
      JSON.stringify({ name: 'test-project', version: '1.0.0' })
    );
    await fs.writeFile(
      path.join(testProjectPath, 'src/index.js'),
      'console.log("test");'
    );
  });

  afterAll(async () => {
    // Cleanup
    await fs.rm(testProjectPath, { recursive: true, force: true });
    closeDatabase();
  });

  it('should create a project', async () => {
    const result = await projectService.createProject({
      path: testProjectPath,
      name: 'Test Project'
    });

    expect(result).toHaveProperty('projectId');
    expect(result.status).toBe('CREATED');
  });

  it('should open a project', async () => {
    const result = await projectService.openProject(testProjectPath);

    expect(result).toHaveProperty('projectId');
    expect(result.status).toBe('BOOTSTRAPPING');
    expect(result.discovery).toHaveProperty('projectType');
  });

  it('should detect Node project', async () => {
    const result = await projectService.openProject(testProjectPath);

    expect(result.discovery.runtimes).toContain('node');
    expect(result.discovery.language).toBe('javascript');
  });

  it('should list projects', async () => {
    const projects = await projectService.listProjects();
    expect(Array.isArray(projects)).toBe(true);
  });
});

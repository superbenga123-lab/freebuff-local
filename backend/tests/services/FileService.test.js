import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fileService } from '../../src/services/FileService.js';
import { projectService } from '../../src/services/ProjectService.js';
import { getDatabase, closeDatabase } from '../../src/database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testProjectPath = path.join(__dirname, '../fixtures/file-test-project');

describe('FileService', () => {
  let projectId;

  beforeAll(async () => {
    await fs.mkdir(testProjectPath, { recursive: true });
    await fs.mkdir(path.join(testProjectPath, 'src'), { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'src/test.js'),
      'console.log("hello");'
    );

    const result = await projectService.openProject(testProjectPath);
    projectId = result.projectId;
  });

  afterAll(async () => {
    await fs.rm(testProjectPath, { recursive: true, force: true });
    closeDatabase();
  });

  it('should get file tree', async () => {
    const tree = await fileService.getTree(projectId);
    expect(Array.isArray(tree)).toBe(true);
    expect(tree.length).toBeGreaterThan(0);
  });

  it('should read file', async () => {
    const file = await fileService.readFile(projectId, 'src/test.js');
    expect(file).toHaveProperty('content');
    expect(file).toHaveProperty('hash');
    expect(file.language).toBe('javascript');
  });

  it('should write file', async () => {
    const newContent = 'console.log("updated");';
    const result = await fileService.writeFile(
      projectId,
      'src/test.js',
      newContent
    );

    expect(result.saved).toBe(true);
    expect(result).toHaveProperty('hash');
  });

  it('should detect language by extension', async () => {
    expect(fileService._detectLanguage('file.js')).toBe('javascript');
    expect(fileService._detectLanguage('file.ts')).toBe('typescript');
    expect(fileService._detectLanguage('file.py')).toBe('python');
    expect(fileService._detectLanguage('file.go')).toBe('go');
  });
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fileService } from '../../src/services/FileService.js';
import { projectService } from '../../src/services/ProjectService.js';
import { getDatabase, closeDatabase } from '../../src/database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testProjectPath = path.join(__dirname, '../fixtures/security-test-project');

describe('Security Tests', () => {
  let projectId;

  beforeAll(async () => {
    await fs.mkdir(testProjectPath, { recursive: true });
    await fs.mkdir(path.join(testProjectPath, 'src'), { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'package.json'),
      JSON.stringify({ name: 'security-test' })
    );

    const result = await projectService.openProject(testProjectPath);
    projectId = result.projectId;
  });

  afterAll(async () => {
    await fs.rm(testProjectPath, { recursive: true, force: true });
    closeDatabase();
  });

  describe('Path Traversal Protection', () => {
    it('should prevent reading files outside project root', async () => {
      try {
        await fileService.readFile(projectId, '../../etc/passwd');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error.message).toContain('Path traversal');
      }
    });

    it('should prevent writing files outside project root', async () => {
      try {
        await fileService.writeFile(
          projectId,
          '../../malicious.js',
          'console.log("bad");'
        );
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error.message).toContain('Path traversal');
      }
    });
  });

  describe('Input Validation', () => {
    it('should handle invalid project ID', async () => {
      try {
        await fileService.readFile('invalid-id', 'file.js');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error.message).toContain('not found');
      }
    });

    it('should handle missing file path', async () => {
      try {
        await fileService.readFile(projectId, '');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

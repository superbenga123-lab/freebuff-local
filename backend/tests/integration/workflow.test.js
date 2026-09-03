import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { projectService } from '../../src/services/ProjectService.js';
import { fileService } from '../../src/services/FileService.js';
import { getDatabase, closeDatabase } from '../../src/database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testProjectPath = path.join(__dirname, '../fixtures/e2e-test-project');

describe('End-to-End Project Workflow', () => {
  beforeAll(async () => {
    await fs.mkdir(testProjectPath, { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'package.json'),
      JSON.stringify({ name: 'e2e-test', version: '1.0.0' })
    );
    await fs.mkdir(path.join(testProjectPath, 'src'), { recursive: true });
    await fs.writeFile(
      path.join(testProjectPath, 'src/main.js'),
      'const main = () => { console.log("hello"); }; module.exports = main;'
    );
  });

  afterAll(async () => {
    await fs.rm(testProjectPath, { recursive: true, force: true });
    closeDatabase();
  });

  it('should complete full workflow: open -> read -> write -> verify', async () => {
    // Step 1: Open project
    const openResult = await projectService.openProject(testProjectPath);
    expect(openResult).toHaveProperty('projectId');
    const projectId = openResult.projectId;

    // Step 2: Get file tree
    const tree = await fileService.getTree(projectId);
    expect(Array.isArray(tree)).toBe(true);
    expect(tree.length).toBeGreaterThan(0);

    // Step 3: Read file
    const fileContent = await fileService.readFile(projectId, 'src/main.js');
    expect(fileContent.content).toContain('hello');
    const originalHash = fileContent.hash;

    // Step 4: Write file
    const newContent = 'const main = () => { console.log("updated"); }; module.exports = main;';
    const writeResult = await fileService.writeFile(projectId, 'src/main.js', newContent);
    expect(writeResult.saved).toBe(true);
    expect(writeResult.hash).not.toBe(originalHash);

    // Step 5: Verify write
    const verifyContent = await fileService.readFile(projectId, 'src/main.js');
    expect(verifyContent.content).toContain('updated');
    expect(verifyContent.hash).toBe(writeResult.hash);
  });

  it('should handle project isolation', async () => {
    const project1Path = path.join(__dirname, '../fixtures/isolation-test-p1');
    const project2Path = path.join(__dirname, '../fixtures/isolation-test-p2');

    // Create two projects
    await fs.mkdir(project1Path, { recursive: true });
    await fs.writeFile(
      path.join(project1Path, 'package.json'),
      JSON.stringify({ name: 'project1' })
    );

    await fs.mkdir(project2Path, { recursive: true });
    await fs.writeFile(
      path.join(project2Path, 'package.json'),
      JSON.stringify({ name: 'project2' })
    );

    const project1 = await projectService.openProject(project1Path);
    const project2 = await projectService.openProject(project2Path);

    expect(project1.projectId).not.toBe(project2.projectId);

    // Cleanup
    await fs.rm(project1Path, { recursive: true, force: true });
    await fs.rm(project2Path, { recursive: true, force: true });
  });
});

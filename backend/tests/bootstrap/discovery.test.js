import { describe, it, expect } from 'vitest';
import { projectDiscovery } from '../../src/project-bootstrap/discovery.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testFixturesPath = path.join(__dirname, '../fixtures');

describe('ProjectDiscovery', () => {
  it('should detect Node project', async () => {
    const nodeProjectPath = path.join(testFixturesPath, 'node-project');
    await fs.mkdir(nodeProjectPath, { recursive: true });
    await fs.writeFile(
      path.join(nodeProjectPath, 'package.json'),
      '{"name": "test"}'
    );

    const result = await projectDiscovery.discover(nodeProjectPath);

    expect(result.runtimes).toContain('node');
    expect(result.language).toBe('javascript');
    expect(result).toHaveProperty('name');

    await fs.rm(nodeProjectPath, { recursive: true, force: true });
  });

  it('should detect TypeScript project', async () => {
    const tsProjectPath = path.join(testFixturesPath, 'ts-project');
    await fs.mkdir(tsProjectPath, { recursive: true });
    await fs.writeFile(
      path.join(tsProjectPath, 'package.json'),
      '{"name": "test"}'
    );
    await fs.writeFile(
      path.join(tsProjectPath, 'tsconfig.json'),
      '{}'
    );

    const result = await projectDiscovery.discover(tsProjectPath);

    expect(result.language).toBe('typescript');

    await fs.rm(tsProjectPath, { recursive: true, force: true });
  });

  it('should detect Git repository', async () => {
    const gitProjectPath = path.join(testFixturesPath, 'git-project');
    await fs.mkdir(gitProjectPath, { recursive: true });
    await fs.mkdir(path.join(gitProjectPath, '.git'), { recursive: true });

    const result = await projectDiscovery.discover(gitProjectPath);

    expect(result.git.detected).toBe(true);
    expect(result.git.enabled).toBe(true);

    await fs.rm(gitProjectPath, { recursive: true, force: true });
  });
});

import { promises as fs } from 'fs';
import { EventEmitter } from 'events';
import { logger } from '../utils/logger.js';
import chokidar from 'chokidar';

const log = logger.child({ module: 'FileWatcher' });

export class FileWatcher extends EventEmitter {
  constructor(projectPath) {
    super();
    this.projectPath = projectPath;
    this.watcher = null;
  }

  start() {
    this.watcher = chokidar.watch(this.projectPath, {
      ignored: /(^|[\/\\])\.|node_modules|dist|\.git|chromadb/,
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100
      }
    });

    this.watcher.on('change', (filePath) => {
      log.debug('File changed', { filePath });
      this.emit('change', filePath);
    });

    this.watcher.on('add', (filePath) => {
      log.debug('File added', { filePath });
      this.emit('add', filePath);
    });

    this.watcher.on('unlink', (filePath) => {
      log.debug('File deleted', { filePath });
      this.emit('delete', filePath);
    });

    log.info('File watcher started', { projectPath: this.projectPath });
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
      log.info('File watcher stopped');
    }
  }
}

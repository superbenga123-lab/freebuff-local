export class BootstrapStateMachine {
  constructor(projectId) {
    this.projectId = projectId;
    this.state = 'CREATED';
    this.transitions = {
      CREATED: ['DISCOVERING'],
      DISCOVERING: ['CONFIGURING', 'FAILED'],
      CONFIGURING: ['SCANNING', 'FAILED'],
      SCANNING: ['INDEXING', 'FAILED'],
      INDEXING: ['BUILDING_GRAPH', 'FAILED'],
      BUILDING_GRAPH: ['BUILDING_RAG', 'FAILED'],
      BUILDING_RAG: ['LOADING_MEMORY', 'DEGRADED'],
      LOADING_MEMORY: ['CHECKING_GIT', 'FAILED'],
      CHECKING_GIT: ['CHECKING_AI', 'FAILED'],
      CHECKING_AI: ['VERIFYING', 'FAILED'],
      VERIFYING: ['READY', 'DEGRADED'],
      READY: [],
      DEGRADED: [],
      FAILED: ['RECOVERING'],
      RECOVERING: ['READY', 'FAILED']
    };
  }

  canTransition(nextState) {
    return this.transitions[this.state]?.includes(nextState);
  }

  transition(nextState) {
    if (!this.canTransition(nextState)) {
      throw new Error(
        `Cannot transition from ${this.state} to ${nextState}`
      );
    }
    this.state = nextState;
    return this.state;
  }

  isReady() {
    return this.state === 'READY';
  }

  isDegraded() {
    return this.state === 'DEGRADED';
  }

  isFailed() {
    return this.state === 'FAILED';
  }
}

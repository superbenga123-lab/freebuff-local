import { describe, it, expect } from 'vitest';
import { BootstrapStateMachine } from '../../src/project-bootstrap/StateMachine.js';

describe('BootstrapStateMachine', () => {
  let machine;

  beforeEach(() => {
    machine = new BootstrapStateMachine('project-001');
  });

  it('should start in CREATED state', () => {
    expect(machine.state).toBe('CREATED');
  });

  it('should transition through valid states', () => {
    machine.transition('DISCOVERING');
    expect(machine.state).toBe('DISCOVERING');

    machine.transition('CONFIGURING');
    expect(machine.state).toBe('CONFIGURING');
  });

  it('should prevent invalid transitions', () => {
    expect(() => machine.transition('READY')).toThrow();
  });

  it('should follow complete bootstrap path', () => {
    const path = [
      'DISCOVERING',
      'CONFIGURING',
      'SCANNING',
      'INDEXING',
      'BUILDING_GRAPH',
      'BUILDING_RAG',
      'LOADING_MEMORY',
      'CHECKING_GIT',
      'CHECKING_AI',
      'VERIFYING',
      'READY'
    ];

    path.forEach((state) => {
      machine.transition(state);
      expect(machine.state).toBe(state);
    });

    expect(machine.isReady()).toBe(true);
  });

  it('should handle failure and recovery', () => {
    machine.transition('DISCOVERING');
    machine.transition('FAILED');
    expect(machine.isFailed()).toBe(true);

    machine.transition('RECOVERING');
    machine.transition('READY');
    expect(machine.isReady()).toBe(true);
  });
});

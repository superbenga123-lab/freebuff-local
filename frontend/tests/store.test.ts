import { describe, it, expect } from 'vitest';
import { create } from 'zustand';

// Frontend store test example
const useTestStore = create((set) => ({
  projectId: null,
  openTabs: [],
  activeFile: null,
  setProjectId: (id) => set({ projectId: id }),
  setOpenTabs: (tabs) => set({ openTabs: tabs }),
  setActiveFile: (file) => set({ activeFile: file })
}));

describe('Frontend Store Tests', () => {
  it('should initialize with default values', () => {
    const store = useTestStore();
    expect(store.projectId).toBeNull();
    expect(store.openTabs).toEqual([]);
    expect(store.activeFile).toBeNull();
  });

  it('should update projectId', () => {
    const store = useTestStore();
    store.setProjectId('project-001');
    expect(store.projectId).toBe('project-001');
  });

  it('should update openTabs', () => {
    const store = useTestStore();
    store.setOpenTabs(['file1.js', 'file2.js']);
    expect(store.openTabs).toEqual(['file1.js', 'file2.js']);
  });

  it('should update activeFile', () => {
    const store = useTestStore();
    store.setActiveFile('file1.js');
    expect(store.activeFile).toBe('file1.js');
  });
});

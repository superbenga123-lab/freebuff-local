import { create } from 'zustand';

interface WorkspaceState {
  projectId: string | null;
  openTabs: string[];
  activeFile: string | null;
  fileTree: any[];
  isLoading: boolean;
  error: string | null;
  setProjectId: (id: string) => void;
  clearProject: () => void;
  setOpenTabs: (tabs: string[]) => void;
  setActiveFile: (file: string) => void;
  setFileTree: (tree: any[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  projectId: null,
  openTabs: [],
  activeFile: null,
  fileTree: [],
  isLoading: false,
  error: null,
  setProjectId: (id) => set({ projectId: id }),
  clearProject: () => set({ projectId: null, openTabs: [], activeFile: null, fileTree: [] }),
  setOpenTabs: (tabs) => set({ openTabs: tabs }),
  setActiveFile: (file) => set({ activeFile: file }),
  setFileTree: (tree) => set({ fileTree: tree }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));

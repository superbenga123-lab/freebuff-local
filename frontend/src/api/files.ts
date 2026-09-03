import { apiClient } from './client';

export const filesApi = {
  getTree: async (projectId: string) => {
    return apiClient.get('/files/tree', { params: { projectId } });
  },

  read: async (projectId: string, path: string) => {
    return apiClient.get('/files/read', { params: { projectId, path } });
  },

  write: async (projectId: string, path: string, content: string) => {
    return apiClient.post('/files/write', { projectId, path, content });
  }
};

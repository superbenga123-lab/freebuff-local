import { apiClient } from './client';

export const projectsApi = {
  create: async (path: string, name?: string) => {
    return apiClient.post('/projects/create', { path, name });
  },

  open: async (path: string) => {
    return apiClient.post('/projects/open', { path });
  },

  list: async () => {
    return apiClient.get('/projects');
  },

  getStatus: async (projectId: string) => {
    return apiClient.get(`/projects/${projectId}/status`);
  },

  close: async (projectId: string) => {
    return apiClient.post(`/projects/${projectId}/close`);
  }
};

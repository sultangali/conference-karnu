import api from './api';

export const moderatorService = {
  // Get all submissions for moderation
  getAllSubmissions: async (params = {}) => {
    const response = await api.get('/api/moderator/submissions', { params });
    return response.data;
  },

  // Update submission status
  updateStatus: async (id, data) => {
    const response = await api.put(`/api/moderator/submissions/${id}`, data);
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/api/moderator/stats');
    return response.data;
  }
};

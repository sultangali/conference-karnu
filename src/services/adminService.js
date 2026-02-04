import api from './api';

export const adminService = {
  // Get all users
  getAllUsers: async (params = {}) => {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
  },

  // Get single user
  getUser: async (id) => {
    const response = await api.get(`/api/admin/users/${id}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (id, role) => {
    const response = await api.put(`/api/admin/users/${id}/role`, { role });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/api/admin/users/${id}`);
    return response.data;
  },

  // Get admin stats
  getStats: async () => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },

  // Send bulk email
  sendBulkEmail: async (data) => {
    const response = await api.post('/api/admin/send-email', data);
    return response.data;
  }
};

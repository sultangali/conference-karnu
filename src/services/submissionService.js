import api from './api';

export const submissionService = {
  // Get all user submissions
  getMySubmissions: async () => {
    const response = await api.get('/api/submissions');
    return response.data;
  },

  // Get single submission
  getSubmission: async (id) => {
    const response = await api.get(`/api/submissions/${id}`);
    return response.data;
  },

  // Create new submission
  createSubmission: async (formData) => {
    const response = await api.post('/api/submissions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Update submission
  updateSubmission: async (id, formData) => {
    const response = await api.put(`/api/submissions/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Delete submission
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.data;
  }
};

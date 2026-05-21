import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ENDPOINTS ====================
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// ==================== NEWS ENDPOINTS ====================
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`),
  getRelated: (id) => api.get(`/news/${id}/related`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
  addComment: (id, comment) => api.post(`/news/${id}/comments`, comment),
};

// ==================== SERVICES ENDPOINTS ====================
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// ==================== STATISTICS ENDPOINTS ====================
export const statisticsAPI = {
  getAll: () => api.get('/statistics'),
  getById: (id) => api.get(`/statistics/${id}`),
  create: (data) => api.post('/statistics', data),
  update: (id, data) => api.put(`/statistics/${id}`, data),
  delete: (id) => api.delete(`/statistics/${id}`),
};

// ==================== ORGANIZATIONS ENDPOINTS ====================
export const organizationsAPI = {
  getAll: (params) => api.get('/organizations', { params }),
  getById: (id) => api.get(`/organizations/${id}`),
  create: (data) => api.post('/organizations', data),
  update: (id, data) => api.put(`/organizations/${id}`, data),
  delete: (id) => api.delete(`/organizations/${id}`),
};

// ==================== MEDIA ENDPOINTS ====================
export const mediaAPI = {
  getGallery: () => api.get('/media/gallery'),
  addToGallery: (data) => api.post('/media/gallery', data),
  deleteFromGallery: (id) => api.delete(`/media/gallery/${id}`),
  getAudio: () => api.get('/media/audio'),
  getAudioById: (id) => api.get(`/media/audio/${id}`),
  addAudio: (data) => api.post('/media/audio', data),
  updateAudio: (id, data) => api.put(`/media/audio/${id}`, data),
  deleteAudio: (id) => api.delete(`/media/audio/${id}`),
};

// ==================== CAROUSEL ENDPOINTS ====================
export const carouselAPI = {
  getAll: () => api.get('/carousel'),
  getById: (id) => api.get(`/carousel/${id}`),
  create: (data) => api.post('/carousel', data),
  update: (id, data) => api.put(`/carousel/${id}`, data),
  delete: (id) => api.delete(`/carousel/${id}`),
};

// ==================== LEADERSHIP ENDPOINTS ====================
export const leadershipAPI = {
  getAll: () => api.get('/leadership'),
  getById: (id) => api.get(`/leadership/${id}`),
  create: (data) => api.post('/leadership', data),
  update: (id, data) => api.put(`/leadership/${id}`, data),
  delete: (id) => api.delete(`/leadership/${id}`),
};

// ==================== DOCUMENTS ENDPOINTS ====================
export const documentsAPI = {
  getAll: (params) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  download: (id) => api.get(`/documents/download/${id}`),
  create: (data) => api.post('/documents', data),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
};

// ==================== FAQ ENDPOINTS ====================
export const faqAPI = {
  getAll: () => api.get('/faqs'),
  getById: (id) => api.get(`/faqs/${id}`),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

// ==================== CONTACT ENDPOINTS ====================
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contacts', { params }),
  getById: (id) => api.get(`/contacts/${id}`),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// ==================== SUBSCRIBERS ENDPOINTS ====================
export const subscribersAPI = {
  subscribe: (email) => api.post('/subscribers', { email }),
  getAll: () => api.get('/subscribers'),
  delete: (id) => api.delete(`/subscribers/${id}`),
};

// ==================== RECEPTION ENDPOINTS ====================
export const receptionAPI = {
  get: () => api.get('/reception'),
  update: (data) => api.put('/reception', data),
};

// ==================== ONLINE RECEPTION ENDPOINTS ====================
export const onlineReceptionAPI = {
  submit: (formData) => api.post('/online-reception/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  track: (code) => api.get(`/online-reception/track/${code}`),
  getAll: () => api.get('/online-reception'),
  getById: (id) => api.get(`/online-reception/${id}`),
  update: (id, data) => api.put(`/online-reception/${id}`, data),
  delete: (id) => api.delete(`/online-reception/${id}`),
};

// ==================== UPLOAD ENDPOINTS ====================
export const uploadAPI = {
  uploadSingle: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress,
    });
  },
  uploadMultiple: (files, onProgress) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress,
    });
  },
  delete: (filename) => api.delete(`/upload/${filename}`),
};

// ==================== ADMIN ENDPOINTS ====================
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard-stats'),
  getActivityLogs: (params) => api.get('/admin/activity-logs', { params }),
  exportLogs: (params) => api.get('/admin/activity-logs/export', { params, responseType: 'blob' }),
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),
  getRecentUploads: () => api.get('/admin/recent-uploads'),
};

export default api;
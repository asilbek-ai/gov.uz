import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

// Interceptors
api.interceptors.request.use(request => {
  console.log('📤', request.method, request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('📥', response.status);
    return response;
  },
  error => {
    console.error('❌', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
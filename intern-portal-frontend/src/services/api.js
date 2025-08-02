import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  
  signup: async (name, email, password) => {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  }
};

export const internAPI = {
  getInternData: async (id) => {
    const response = await api.get(`/intern/${id}`);
    return response.data;
  },
  
  getLeaderboard: async () => {
    const response = await api.get('/interns');
    return response.data;
  }
};

export const healthAPI = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;

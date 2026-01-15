import axios from 'axios';
import store from '../redux/store';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 50000,
});

instance.interceptors.request.use((config) => {
  // Get token from Redux store
  const state = store.getState();
  const token = state.user?.token;
 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
function (error) {return Promise.reject(error);});

const responseBody = (response) => response.data;


const requests = {
  get: (url, headers = {}) => instance.get(url, { headers }).then(responseBody),
  post: (url, body, headers = {}) => instance.post(url, body, { headers }).then(responseBody),
  put: (url, body, headers = {}) => instance.put(url, body, { headers }).then(responseBody),
  patch: (url, body, headers = {}) => instance.patch(url, body, { headers }).then(responseBody),
  delete: (url, body, headers = {}) => instance.delete(url, { data: body, headers }).then(responseBody),
};

export default requests;
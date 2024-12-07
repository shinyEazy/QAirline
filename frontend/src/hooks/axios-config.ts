
// axiosConfig.ts
import axios from 'axios';

// Set base URL for your API
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Configure request interceptor
axios.interceptors.request.use(
  (config) => {
    // Set the default headers for every request
    config.headers['accept'] = 'application/json';

    // Retrieve the token from storage
    const token = localStorage.getItem('authToken'); // Or sessionStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle errors in request configuration
    return Promise.reject(error);
  }
);

// Configure response interceptor (optional)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors in responses, e.g., token expiration
    return Promise.reject(error);
  }
);

export default axios;

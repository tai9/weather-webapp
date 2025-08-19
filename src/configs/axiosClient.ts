import axios from 'axios';

export const API_URL = import.meta.env.VITE_VERCEL_API_URL;

const axiosClient = axios.create({
  baseURL: `${API_URL}/data/2.5`
});

axiosClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      appid: import.meta.env.VITE_VERCEL_API_KEY
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default axiosClient;

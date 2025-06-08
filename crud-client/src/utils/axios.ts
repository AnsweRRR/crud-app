import axios from 'axios';
import { HOST_API_KEY } from '../config-global';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Valami hiba történt';
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
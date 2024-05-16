import Axios from 'axios';

const Api = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Agregar interceptor para incluir el token de autorización en las solicitudes
const requestInterceptor = Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log('Interceptors:', Api.interceptors);

// Eliminar el interceptor de solicitud si es necesario
// Api.interceptors.request.eject(requestInterceptor);

export default Api;

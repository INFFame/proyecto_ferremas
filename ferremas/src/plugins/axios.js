import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/erp/productos/', //la URL base de la API
  timeout: 1000, // Ajusta el tiempo de espera
  headers: {
    'Content-Type': 'application/json',
    // Agrega cualquier otro encabezado
  }
});

export default axiosInstance;

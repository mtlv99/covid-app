import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const diabetesApi = axios.create({
  baseURL: VITE_API_URL,
});


// En el archivo de barril hay que agregar el "default as diabetesApi"
// porque es una exportación por defecto.
export default diabetesApi;

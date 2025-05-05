import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const covidApi = axios.create({
  baseURL: VITE_API_URL,
});

// En el archivo de barril hay que agregar el "default as covidApi"
// porque es una exportación por defecto.
export default covidApi;

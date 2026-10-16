// Backend API configuration
export const BACKEND_URL = 'https://amigowebster.in/gga';
export const API_BASE_URL = import.meta.env.VITE_API_URL || `${BACKEND_URL}/api`;

export default API_BASE_URL;

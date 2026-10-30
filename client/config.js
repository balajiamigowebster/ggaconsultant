// Backend API configuration
export const BACKEND_URL = 'https://amigowebster.in/gga';

// If your live backend routes are prefixed with /api (e.g. https://amigowebster.in/gga/api), keep it. 
// If your live backend routes are directly under /gga (e.g. https://amigowebster.in/gga/settings), adjust accordingly.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://amigowebster.in/gga/api';

export default API_BASE_URL;
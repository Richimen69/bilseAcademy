import API_CONFIG from "../config/apiConfig";

/**
 * Función principal para hacer peticiones a la API
 * @param {string} endpoint - Endpoint de la API (sin el baseURL)
 * @param {Object} options - Opciones de fetch (method, body, headers, etc.)
 * @returns {Promise} - Respuesta de la API en formato estandarizado
 */
const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
  
  const headers = {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);


    if (response.status === 204) {
      return { 
        success: true, 
        message: 'Operación exitosa',
        data: null 
      };
    }

    // Intentar parsear la respuesta como JSON
    let data;
    try {
      data = await response.json();
    } catch {
      data = { 
        success: false, 
        message: 'La respuesta del servidor no es válida',
        errors: {}
      };
    }
    return data;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'La solicitud ha excedido el tiempo de espera',
        errors: {}
      };
    }
    
    return {
      success: false,
      message: error.message || 'Error de conexión',
      errors: {}
    };
  }
};

export default fetchApi;
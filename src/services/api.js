const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithFallback = async (endpoint, fallbackData = []) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    return await handleResponse(response);
  } catch (error) {
    console.warn(`Failed to fetch ${endpoint}, using fallback data:`, error);
    return fallbackData;
  }
};

export const api = {
  async getUsers() {
    return fetchWithFallback('/users', []);
  },

  async createUser(userData) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getEquipamentos() {
    return fetchWithFallback('/equipamentos', []);
  },

  async getOrdensServico() {
    return fetchWithFallback('/ordensServico', []);
  },

  async getAreas() {
    return fetchWithFallback('/areas', []);
  },

  async getInventario() {
    return fetchWithFallback('/inventario', []);
  },
};
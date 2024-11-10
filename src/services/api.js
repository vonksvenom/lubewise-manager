const API_URL = 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Users
  async getUsers() {
    try {
      const response = await fetch(`${API_URL}/users`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Equipamentos
  async getEquipamentos() {
    try {
      const response = await fetch(`${API_URL}/equipamentos`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching equipamentos:', error);
      return [];
    }
  },

  async createEquipamento(equipamentoData) {
    const response = await fetch(`${API_URL}/equipamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipamentoData),
    });
    return response.json();
  },

  // Ordens de Serviço
  async getOrdensServico() {
    try {
      const response = await fetch(`${API_URL}/ordensServico`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching ordens servico:', error);
      return [];
    }
  },

  async createOrdemServico(ordemData) {
    const response = await fetch(`${API_URL}/ordensServico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ordemData),
    });
    return response.json();
  },

  // Areas
  async getAreas() {
    try {
      const response = await fetch(`${API_URL}/areas`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching areas:', error);
      return [];
    }
  },

  async createArea(areaData) {
    const response = await fetch(`${API_URL}/areas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(areaData),
    });
    return response.json();
  },

  // Inventário
  async getInventario() {
    try {
      const response = await fetch(`${API_URL}/inventario`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching inventario:', error);
      return [];
    }
  },

  async createInventario(inventarioData) {
    const response = await fetch(`${API_URL}/inventario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventarioData),
    });
    return response.json();
  },
};

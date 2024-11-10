const API_URL = 'http://localhost:3001/api';

export const api = {
  // Usuários
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
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
    const response = await fetch(`${API_URL}/equipamentos`);
    return response.json();
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
    const response = await fetch(`${API_URL}/ordensServico`);
    return response.json();
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

  // Inventário
  async getInventario() {
    const response = await fetch(`${API_URL}/inventario`);
    return response.json();
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
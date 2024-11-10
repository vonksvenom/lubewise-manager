import { api } from './api';

const STORAGE_KEY = 'ordensServico';

const getAllLocal = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting local orders:', error);
    return [];
  }
};

const saveLocal = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving local orders:', error);
  }
};

export const ordemServicoService = {
  async getAll() {
    try {
      const data = await api.getOrdensServico();
      saveLocal(data);
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getAllLocal();
    }
  },

  getAllLocal,

  async add(ordem) {
    try {
      const newOrdem = await api.createOrdemServico(ordem);
      const orders = await this.getAll();
      orders.push(newOrdem);
      saveLocal(orders);
      return newOrdem;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },

  async update(id, ordem) {
    try {
      const orders = await this.getAll();
      const index = orders.findIndex(o => o.id === id);
      if (index !== -1) {
        orders[index] = { ...orders[index], ...ordem };
        saveLocal(orders);
        return orders[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const orders = await this.getAll();
      const filtered = orders.filter(ordem => ordem.id !== id);
      saveLocal(filtered);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};
import { API_BASE_URL } from '../config/api';
import { initialEquipamentos } from './initialData';

const getAll = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipamentos`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipamentos:', error);
    return initialEquipamentos; // Fallback para dados iniciais
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipamentos/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipamento:', error);
    return null;
  }
};

const add = async (equipamento) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipamento),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error adding equipamento:', error);
    throw error;
  }
};

const update = async (id, equipamento) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipamento),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error updating equipamento:', error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipamentos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return true;
  } catch (error) {
    console.error('Error deleting equipamento:', error);
    throw error;
  }
};

export const equipamentoService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
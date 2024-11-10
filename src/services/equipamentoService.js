import { initialEquipamentos } from './initialData';

const STORAGE_KEY = 'equipamentos';

const getAll = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEquipamentos));
    return initialEquipamentos;
  }
  return JSON.parse(data);
};

const getById = (id) => {
  const equipamentos = getAll();
  return equipamentos.find(equip => equip.id === id);
};

const add = (equipamento) => {
  const equipamentos = getAll();
  const newEquipamento = {
    ...equipamento,
    id: Date.now().toString(),
  };
  equipamentos.push(newEquipamento);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
  return newEquipamento;
};

const update = (id, equipamento) => {
  const equipamentos = getAll();
  const index = equipamentos.findIndex(equip => equip.id === id);
  if (index !== -1) {
    equipamentos[index] = { ...equipamentos[index], ...equipamento };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
    return equipamentos[index];
  }
  return null;
};

const remove = (id) => {
  const equipamentos = getAll();
  const filtered = equipamentos.filter(equip => equip.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const equipamentoService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
import { initialEquipamentos } from './data/equipmentData';

const STORAGE_KEY = 'equipamentos';

const init = () => {
  const existingEquipamentos = localStorage.getItem(STORAGE_KEY);
  if (!existingEquipamentos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEquipamentos));
  }
};

const getAll = () => {
  init();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data);
};

const getById = (id) => {
  const equipamentos = getAll();
  return equipamentos.find(equipamento => equipamento.id === id);
};

const add = (equipamento) => {
  const equipamentos = getAll();
  const newEquipamento = {
    ...equipamento,
    id: Date.now().toString(),
    lessonsLearned: [],
  };
  equipamentos.push(newEquipamento);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
  return newEquipamento;
};

const update = (id, equipamento) => {
  const equipamentos = getAll();
  const index = equipamentos.findIndex(e => e.id === id);
  if (index !== -1) {
    equipamentos[index] = { ...equipamentos[index], ...equipamento };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
    return equipamentos[index];
  }
  return null;
};

const addLessonLearned = (equipamentoId, lesson) => {
  const equipamentos = getAll();
  const index = equipamentos.findIndex(e => e.id === equipamentoId);
  if (index !== -1) {
    if (!equipamentos[index].lessonsLearned) {
      equipamentos[index].lessonsLearned = [];
    }
    equipamentos[index].lessonsLearned.push(lesson);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
    return equipamentos[index];
  }
  return null;
};

const remove = (id) => {
  const equipamentos = getAll();
  const filtered = equipamentos.filter(equipamento => equipamento.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const equipamentoService = {
  init,
  getAll,
  getById,
  add,
  update,
  addLessonLearned,
  delete: remove
};
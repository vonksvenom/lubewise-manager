import { initialEquipamentos } from './data/equipmentData';

let equipamentos = [...initialEquipamentos];

const getAll = () => {
  return equipamentos;
};

const getById = (id) => {
  return equipamentos.find(equipamento => equipamento.id === id);
};

const add = (equipamento) => {
  const newEquipamento = {
    ...equipamento,
    id: Date.now().toString(),
    lessonsLearned: [],
  };
  equipamentos.push(newEquipamento);
  return newEquipamento;
};

const update = (id, equipamento) => {
  const index = equipamentos.findIndex(e => e.id === id);
  if (index !== -1) {
    equipamentos[index] = { ...equipamentos[index], ...equipamento };
    return equipamentos[index];
  }
  return null;
};

const addLessonLearned = (equipamentoId, lesson) => {
  const index = equipamentos.findIndex(e => e.id === equipamentoId);
  if (index !== -1) {
    if (!equipamentos[index].lessonsLearned) {
      equipamentos[index].lessonsLearned = [];
    }
    equipamentos[index].lessonsLearned.push(lesson);
    return equipamentos[index];
  }
  return null;
};

const remove = (id) => {
  equipamentos = equipamentos.filter(equipamento => equipamento.id !== id);
  return equipamentos;
};

export const equipamentoService = {
  getAll,
  getById,
  add,
  update,
  addLessonLearned,
  delete: remove
};
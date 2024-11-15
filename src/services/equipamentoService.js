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

const addDateChangeHistory = (equipamentoId, changeData) => {
  const equipamento = getById(equipamentoId);
  if (equipamento) {
    if (!equipamento.dateChangeHistory) {
      equipamento.dateChangeHistory = [];
    }

    equipamento.dateChangeHistory.push({
      id: Date.now().toString(),
      previousDate: changeData.previousDate,
      newDate: changeData.newDate,
      reason: changeData.reason,
      changedBy: changeData.userId,
      changedAt: new Date().toISOString(),
      updatedRecurring: changeData.updateRecurring
    });

    return equipamento;
  }
  return null;
};

export const equipamentoService = {
  getAll,
  getById,
  add,
  update,
  addLessonLearned,
  addDateChangeHistory,
  delete: remove
};

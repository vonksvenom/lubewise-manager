import { initialOrdensServico } from './data/workOrderData';
import { addMonths, addYears, addDays } from 'date-fns';

let ordensServico = [...initialOrdensServico];

const getAll = () => {
  return ordensServico;
};

const getById = (id) => {
  return ordensServico.find(ordem => ordem.id === id);
};

const add = (ordem) => {
  const newOrdem = {
    ...ordem,
    id: ordem.id || Date.now().toString(),
  };
  ordensServico.push(newOrdem);
  return newOrdem;
};

const updateRecurringDates = (ordem, previousDate) => {
  const affectedOrders = ordensServico.filter(o => 
    o.equipamentoId === ordem.equipamentoId && 
    o.recorrencia === ordem.recorrencia &&
    new Date(o.dataExecucao) > new Date(previousDate)
  );

  const timeDiff = new Date(ordem.dataExecucao).getTime() - new Date(previousDate).getTime();

  affectedOrders.forEach(order => {
    const currentDate = new Date(order.dataExecucao);
    order.dataExecucao = new Date(currentDate.getTime() + timeDiff).toISOString();
  });

  return affectedOrders;
};

const update = (id, ordem) => {
  const index = ordensServico.findIndex(o => o.id === id);
  if (index === -1) return null;

  if (ordem.updateRecurringDates) {
    updateRecurringDates(ordem, ordem.previousDate);
    delete ordem.updateRecurringDates;
    delete ordem.previousDate;
  }

  ordensServico[index] = { ...ordensServico[index], ...ordem };
  return ordensServico[index];
};

const remove = (id) => {
  ordensServico = ordensServico.filter(ordem => ordem.id !== id);
};

export const ordemServicoService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
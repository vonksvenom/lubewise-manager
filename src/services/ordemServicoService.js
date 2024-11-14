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
    o.tipo === ordem.tipo &&
    o.recorrencia === ordem.recorrencia &&
    new Date(o.dataExecucao) > new Date(previousDate)
  );

  const dateDiff = new Date(ordem.dataExecucao) - new Date(previousDate);

  affectedOrders.forEach(o => {
    const newDate = new Date(o.dataExecucao);
    newDate.setTime(newDate.getTime() + dateDiff);
    o.dataExecucao = newDate.toISOString();
  });

  return affectedOrders;
};

const update = (id, ordem) => {
  const index = ordensServico.findIndex(os => os.id === id);
  if (index !== -1) {
    if (ordem.updateRecurringDates) {
      updateRecurringDates(ordem, ordem.previousDate);
      delete ordem.updateRecurringDates;
      delete ordem.previousDate;
    }
    
    ordensServico[index] = { ...ordensServico[index], ...ordem };
    return ordensServico[index];
  }
  return null;
};

const remove = (id) => {
  ordensServico = ordensServico.filter(ordem => ordem.id !== id);
  return ordensServico;
};

export const ordemServicoService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
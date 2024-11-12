import { initialOrdensServico } from './data/workOrderData';

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

const update = (id, ordem) => {
  const index = ordensServico.findIndex(os => os.id === id);
  if (index !== -1) {
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
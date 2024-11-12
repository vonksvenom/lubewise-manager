import { initialOrdensServico } from './data/workOrderData';

const getAll = () => {
  return initialOrdensServico;
};

const getById = (id) => {
  const ordensServico = getAll();
  return ordensServico.find(ordem => ordem.id === id);
};

const add = (ordem) => {
  const ordensServico = getAll();
  const newOrdem = {
    ...ordem,
    id: ordem.id || Date.now().toString(),
  };
  ordensServico.push(newOrdem);
  return newOrdem;
};

const update = (id, ordem) => {
  const ordensServico = getAll();
  const index = ordensServico.findIndex(os => os.id === id);
  if (index !== -1) {
    ordensServico[index] = { ...ordensServico[index], ...ordem };
    return ordensServico[index];
  }
  return null;
};

const remove = (id) => {
  const ordensServico = getAll();
  return ordensServico.filter(ordem => ordem.id !== id);
};

export const ordemServicoService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
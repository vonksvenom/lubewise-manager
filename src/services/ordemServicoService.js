import { initialOrdensServico } from './initialData';

const STORAGE_KEY = 'ordensServico';

const getAll = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Se não houver dados no localStorage, use os dados iniciais
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrdensServico));
    return initialOrdensServico;
  }
  try {
    const parsedData = JSON.parse(data);
    // Se o array estiver vazio, recarregue os dados iniciais
    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrdensServico));
      return initialOrdensServico;
    }
    return parsedData;
  } catch (error) {
    // Se houver erro ao parsear os dados, recarregue os dados iniciais
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrdensServico));
    return initialOrdensServico;
  }
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordensServico));
  return newOrdem;
};

const bulkAdd = (ordens) => {
  const ordensServico = getAll();
  const newOrdens = ordens.map(ordem => ({
    ...ordem,
    id: ordem.id || Date.now().toString(),
  }));
  ordensServico.push(...newOrdens);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordensServico));
  return newOrdens;
};

const update = (id, ordem) => {
  const ordensServico = getAll();
  const index = ordensServico.findIndex(os => os.id === id);
  if (index !== -1) {
    ordensServico[index] = { ...ordensServico[index], ...ordem };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordensServico));
    return ordensServico[index];
  }
  return null;
};

const remove = (id) => {
  const ordensServico = getAll();
  const filtered = ordensServico.filter(ordem => ordem.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const ordemServicoService = {
  getAll,
  getById,
  add,
  bulkAdd,
  update,
  delete: remove
};
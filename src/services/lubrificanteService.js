import { getLubrificantes, saveLubrificantes } from './lubrificante/lubrificanteStorage';

const getAll = async () => {
  return getLubrificantes();
};

const getById = async (id) => {
  const lubrificantes = await getAll();
  return lubrificantes.find(item => item.id === id);
};

const add = async (lubrificante) => {
  const lubrificantes = await getAll();
  const newLubrificante = {
    ...lubrificante,
    id: Date.now().toString(),
  };
  lubrificantes.push(newLubrificante);
  saveLubrificantes(lubrificantes);
  return newLubrificante;
};

const update = async (id, lubrificante) => {
  const lubrificantes = await getAll();
  const index = lubrificantes.findIndex(item => item.id === id);
  if (index !== -1) {
    const updatedLubrificante = { ...lubrificantes[index], ...lubrificante };
    lubrificantes[index] = updatedLubrificante;
    saveLubrificantes(lubrificantes);
    return updatedLubrificante;
  }
  return null;
};

const remove = async (id) => {
  const lubrificantes = await getAll();
  const filtered = lubrificantes.filter(item => item.id !== id);
  saveLubrificantes(filtered);
};

export const lubrificanteService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
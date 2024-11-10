const STORAGE_KEY = 'lubrificantes';

const getAll = async () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lubrificantes));
  return newLubrificante;
};

const update = async (id, lubrificante) => {
  const lubrificantes = await getAll();
  const index = lubrificantes.findIndex(item => item.id === id);
  if (index !== -1) {
    const updatedLubrificante = { ...lubrificantes[index], ...lubrificante };
    lubrificantes[index] = updatedLubrificante;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lubrificantes));
    return updatedLubrificante;
  }
  return null;
};

const remove = async (id) => {
  const lubrificantes = await getAll();
  const filtered = lubrificantes.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const lubrificanteService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
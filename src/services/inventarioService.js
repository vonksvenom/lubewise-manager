const STORAGE_KEY = 'inventario';

const getAll = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const getById = (id) => {
  const items = getAll();
  return items.find(item => item.id === id);
};

const add = (item) => {
  const items = getAll();
  const newItem = {
    ...item,
    id: Date.now().toString(),
    dataRegistro: new Date().toISOString()
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
};

const update = (id, item) => {
  const items = getAll();
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...item };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items[index];
  }
  return null;
};

const remove = (id) => {
  const items = getAll();
  const filtered = items.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const inventarioService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
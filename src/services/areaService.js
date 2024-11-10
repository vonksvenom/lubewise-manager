import { initialAreas } from './initialData';

const STORAGE_KEY = 'areas';

const getAll = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAreas));
    return initialAreas;
  }
  return JSON.parse(data);
};

const getById = (id) => {
  const areas = getAll();
  return areas.find(area => area.id === id);
};

const add = (area) => {
  const areas = getAll();
  const newArea = {
    ...area,
    id: Date.now().toString(),
  };
  areas.push(newArea);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
  return newArea;
};

const update = (id, area) => {
  const areas = getAll();
  const index = areas.findIndex(a => a.id === id);
  if (index !== -1) {
    areas[index] = { ...areas[index], ...area };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
    return areas[index];
  }
  return null;
};

const remove = (id) => {
  const areas = getAll();
  const filtered = areas.filter(area => area.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const areaService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
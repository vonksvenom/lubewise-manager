import { initialAreas } from './initialData';

let areas = [...initialAreas];

const getAll = () => {
  return areas;
};

const getById = (id) => {
  return areas.find(area => area.id === id);
};

const add = (area) => {
  const newArea = {
    ...area,
    id: area.id || Date.now().toString(),
  };
  areas.push(newArea);
  return newArea;
};

const update = (id, area) => {
  const index = areas.findIndex(a => a.id === id);
  if (index !== -1) {
    areas[index] = { ...areas[index], ...area };
    return areas[index];
  }
  return null;
};

const remove = (id) => {
  areas = areas.filter(area => area.id !== id);
  return areas;
};

export const areaService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
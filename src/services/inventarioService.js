import { initialInventario } from './data/inventoryData';

let inventario = [...initialInventario];

const getAll = () => {
  return inventario;
};

const getById = (id) => {
  return inventario.find(item => item.id === id);
};

const add = (item) => {
  const newItem = {
    ...item,
    id: item.id || Date.now().toString(),
  };
  inventario.push(newItem);
  return newItem;
};

const update = (id, item) => {
  const index = inventario.findIndex(i => i.id === id);
  if (index !== -1) {
    inventario[index] = { ...inventario[index], ...item };
    return inventario[index];
  }
  return null;
};

const remove = (id) => {
  inventario = inventario.filter(item => item.id !== id);
  return inventario;
};

const getHistoricoByPeriod = (startDate, endDate, area = null) => {
  const filteredHistorico = inventario.filter(item => {
    const itemDate = new Date(item.dataRegistro);
    const isInDateRange = itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    return isInDateRange && (area ? item.area === area : true);
  });
  return filteredHistorico;
};

export const inventarioService = {
  getAll,
  getById,
  add,
  update,
  delete: remove,
  getHistoricoByPeriod
};

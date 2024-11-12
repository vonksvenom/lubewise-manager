import { format } from 'date-fns';

export const generateRandomDate = (start, end) => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return format(randomDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};

export const generateInventoryItem = (id, data) => ({
  id: id.toString(),
  name: data.name,
  type: data.type,
  quantity: data.quantity,
  unit: data.unit,
  location: data.location,
  area: data.area,
  dataRegistro: generateRandomDate(new Date(2024, 0, 1), new Date()),
  minimumStock: data.minimumStock,
  reorderPoint: data.reorderPoint,
  fornecedor: data.fornecedor,
  aplicacao: data.aplicacao,
  shelf: data.shelf,
  lastPurchase: generateRandomDate(new Date(2024, 0, 1), new Date()),
  price: data.price,
  descricaoComercial: data.descricaoComercial,
  viscosidade: data.viscosidade,
  pontoFluidez: data.pontoFluidez,
  pontoFulgor: data.pontoFulgor,
  indiceViscosidade: data.indiceViscosidade,
});
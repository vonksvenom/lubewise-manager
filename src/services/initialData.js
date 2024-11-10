export { initialEquipamentos } from './data/equipmentData';
export { initialInventario } from './data/inventoryData';
export { initialOrdensServico } from './data/workOrderData';
export { initialUsers, initialCompanies } from './data/userData';

export const initialAreas = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  nome: `Área ${i + 1}`,
  descricao: `Descrição da área ${i + 1}`,
  responsavel: `Responsável ${Math.floor((i + 1)/3)}`
}));
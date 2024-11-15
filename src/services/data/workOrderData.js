import { initialEquipamentos } from './equipmentData';
import { baseWorkOrders } from './workOrders/baseWorkOrders';
import { generateMaintenanceOrders } from './workOrders/maintenanceOrderGenerator';

const generateOrdensServico = () => {
  const ordens = [...baseWorkOrders];
  const equipamentos = initialEquipamentos;

  equipamentos.forEach(equipamento => {
    const maintenanceOrders = generateMaintenanceOrders(equipamento);
    ordens.push(...maintenanceOrders);
  });

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
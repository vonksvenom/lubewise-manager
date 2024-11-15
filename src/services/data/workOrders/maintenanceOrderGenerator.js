import { addDays, addMonths } from 'date-fns';
import { calculateNextDate } from './recurrenceUtils';

export const generateMaintenanceOrders = (equipamento) => {
  const orders = [];
  
  if (!equipamento.maintenancePlans) return orders;

  equipamento.maintenancePlans.forEach(plan => {
    const dataInicio = new Date(plan.dataInicio);
    let currentDate = new Date(dataInicio);
    const endDate = addMonths(dataInicio, 12);

    while (currentDate <= endDate) {
      orders.push({
        id: `${equipamento.id}-${currentDate.getTime()}`,
        titulo: plan.titulo,
        descricao: plan.descricao,
        tipo: plan.tipo,
        status: "Pendente",
        prioridade: plan.prioridade,
        equipamentoId: equipamento.id,
        dataInicio: currentDate.toISOString(),
        dataFim: addDays(currentDate, 1).toISOString(),
        dataExecucao: currentDate.toISOString(),
        tecnicoId: null,
        recorrencia: plan.recorrencia,
        horasEstimadas: 4,
      });

      const nextDate = calculateNextDate(currentDate, plan.recorrencia);
      if (!nextDate) break;
      currentDate = nextDate;
    }
  });

  return orders;
};
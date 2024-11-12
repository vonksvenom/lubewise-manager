import { addDays, subDays, addMonths } from 'date-fns';
import { generateRandomDate } from './utils';
import { initialEquipamentos } from './equipmentData';
import { 
  tipos, 
  titulosPreventiva, 
  titulosCorretiva, 
  titulosPreditiva 
} from './workOrders/workOrderTypes';
import { baseWorkOrders } from './workOrders/baseWorkOrders';
import { RECURRENCE_OPTIONS } from '@/constants/recurrenceOptions';

const generateOrdensServico = () => {
  const ordens = [];
  const equipamentos = initialEquipamentos;

  equipamentos.forEach(equipamento => {
    // Generate orders from maintenance plans
    if (equipamento.maintenancePlans) {
      equipamento.maintenancePlans.forEach(plan => {
        const dataInicio = new Date(plan.dataInicio);
        
        // Generate orders for the next 12 months based on recurrence
        let currentDate = new Date(dataInicio);
        const endDate = addMonths(dataInicio, 12);

        while (currentDate <= endDate) {
          ordens.push({
            id: `${equipamento.id}-${currentDate.getTime()}`,
            titulo: plan.titulo,
            descricao: plan.descricao,
            tipo: plan.tipo,
            status: "Pendente",
            prioridade: plan.prioridade,
            equipamentoId: equipamento.id,
            dataInicio: currentDate.toISOString(),
            dataFim: addDays(currentDate, 1).toISOString(),
            tecnicoId: null,
            recorrencia: plan.recorrencia,
            horasEstimadas: 4,
          });

          // Calculate next date based on recurrence
          switch (plan.recorrencia) {
            case "daily":
              currentDate = addDays(currentDate, 1);
              break;
            case "weekly":
              currentDate = addDays(currentDate, 7);
              break;
            case "biweekly":
              currentDate = addDays(currentDate, 14);
              break;
            case "monthly":
              currentDate = addMonths(currentDate, 1);
              break;
            case "bimonthly":
              currentDate = addMonths(currentDate, 2);
              break;
            case "quarterly":
              currentDate = addMonths(currentDate, 3);
              break;
            case "fourmonths":
              currentDate = addMonths(currentDate, 4);
              break;
            case "fivemonths":
              currentDate = addMonths(currentDate, 5);
              break;
            case "sixmonths":
              currentDate = addMonths(currentDate, 6);
              break;
            case "sevenmonths":
              currentDate = addMonths(currentDate, 7);
              break;
            case "eightmonths":
              currentDate = addMonths(currentDate, 8);
              break;
            case "ninemonths":
              currentDate = addMonths(currentDate, 9);
              break;
            case "tenmonths":
              currentDate = addMonths(currentDate, 10);
              break;
            case "elevenmonths":
              currentDate = addMonths(currentDate, 11);
              break;
            case "yearly":
              currentDate = addMonths(currentDate, 12);
              break;
            default:
              currentDate = endDate; // Skip if no recurrence
          }
        }
      });
    }
  });

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
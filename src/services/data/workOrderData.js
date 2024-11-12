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
  return [];
};

export const initialOrdensServico = generateOrdensServico();
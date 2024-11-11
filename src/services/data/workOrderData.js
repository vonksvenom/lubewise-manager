import { addDays, subDays } from 'date-fns';
import { generateRandomDate } from './utils';

const generateOrdensServico = () => {
  const ordens = [];
  const tipos = ["Preventiva", "Corretiva", "Preditiva"];
  const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  const tecnicos = ["3", "5", "6", "7"]; // IDs dos técnicos
  
  const now = new Date();
  const oneMonthAgo = subDays(now, 30);
  const nextMonth = addDays(now, 30);

  // Generate first 100 orders
  for (let i = 1; i <= 100; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    let dataInicio, dataFim;

    if (i <= 30) {
      dataInicio = generateRandomDate(oneMonthAgo, subDays(now, 5));
      dataFim = generateRandomDate(dataInicio, subDays(now, 1));
    } else if (i <= 60) {
      dataInicio = generateRandomDate(subDays(now, 4), addDays(now, 3));
      dataFim = generateRandomDate(dataInicio, addDays(dataInicio, 5));
    } else {
      dataInicio = generateRandomDate(addDays(now, 4), nextMonth);
      dataFim = generateRandomDate(dataInicio, addDays(dataInicio, 7));
    }

    ordens.push({
      id: i.toString(),
      titulo: `Ordem de Serviço ${i}`,
      descricao: `Descrição detalhada da ordem de serviço ${i}`,
      tipo,
      equipamentoId: Math.ceil(Math.random() * 100).toString(),
      status: status[Math.floor(Math.random() * status.length)],
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      tecnicoId: tecnicos[Math.floor(Math.random() * tecnicos.length)],
      consumables: [
        { type: "Óleo", quantity: Math.floor(Math.random() * 10) },
        { type: "Graxa", quantity: Math.floor(Math.random() * 5) }
      ]
    });
  }

  // Generate 250 additional future orders
  const startDate = new Date('2024-12-01');
  const endDate = new Date('2025-12-31');
  const timeSpan = endDate.getTime() - startDate.getTime();
  
  for (let i = 101; i <= 350; i++) {
    const percentComplete = (i - 101) / 249; // 0 to 1
    const baseDate = new Date(startDate.getTime() + (timeSpan * percentComplete));
    const dataInicio = new Date(baseDate.getTime() + (Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random offset within a week
    const dataFim = new Date(dataInicio.getTime() + (Math.random() * 14 * 24 * 60 * 60 * 1000)); // Random duration up to 2 weeks

    ordens.push({
      id: i.toString(),
      titulo: `Ordem de Serviço ${i}`,
      descricao: `Descrição detalhada da ordem de serviço ${i}`,
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      equipamentoId: Math.ceil(Math.random() * 100).toString(),
      status: "Pendente", // All future orders are pending
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      tecnicoId: tecnicos[Math.floor(Math.random() * tecnicos.length)],
      consumables: [
        { type: "Óleo", quantity: Math.floor(Math.random() * 10) },
        { type: "Graxa", quantity: Math.floor(Math.random() * 5) }
      ]
    });
  }

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
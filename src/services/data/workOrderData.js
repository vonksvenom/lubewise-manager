import { addDays, subDays } from 'date-fns';
import { generateRandomDate } from './utils';

const generateOrdensServico = () => {
  const ordens = [];
  const tipos = ["Preventiva", "Corretiva", "Preditiva"];
  const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  
  const now = new Date();
  const oneMonthAgo = subDays(now, 30);
  const nextMonth = addDays(now, 30);

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
      consumables: [
        { type: "Óleo", quantity: Math.floor(Math.random() * 10) },
        { type: "Graxa", quantity: Math.floor(Math.random() * 5) }
      ]
    });
  }
  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
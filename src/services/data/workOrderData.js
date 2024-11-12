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
  const ordens = [...baseWorkOrders];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  const tecnicos = ["3", "5", "6", "7", "8", "9", "10", "11", "12"];
  const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
  const recorrencias = RECURRENCE_OPTIONS.map(opt => opt.value);

  // Define date range from 2023 to 2026
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2026-12-31');

  for (let i = 1; i <= 1000; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    let titulo;
    
    switch (tipo) {
      case "Preventiva":
        titulo = titulosPreventiva[Math.floor(Math.random() * titulosPreventiva.length)];
        break;
      case "Corretiva":
        titulo = titulosCorretiva[Math.floor(Math.random() * titulosCorretiva.length)];
        break;
      case "Preditiva":
        titulo = titulosPreditiva[Math.floor(Math.random() * titulosPreditiva.length)];
        break;
    }

    const equipamento = initialEquipamentos[Math.floor(Math.random() * initialEquipamentos.length)];
    const currentStatus = status[Math.floor(Math.random() * status.length)];
    const recorrencia = recorrencias[Math.floor(Math.random() * recorrencias.length)];
    
    // Generate random date between 2023 and 2026
    const dataExecucao = generateRandomDate(startDate, endDate);
    
    ordens.push({
      id: i.toString(),
      titulo: `${titulo} - ${equipamento.tag}`,
      descricao: `Realizar ${titulo.toLowerCase()} conforme procedimento padrão de manutenção. Incluir relatório técnico e registros fotográficos.`,
      tipo: tipo,
      equipamentoId: equipamento.id,
      status: currentStatus,
      dataExecucao: dataExecucao.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      tecnicoId: tecnicos[Math.floor(Math.random() * tecnicos.length)],
      recorrencia: recorrencia,
      dataLocked: Math.random() > 0.8,
      procedimentos: [
        "1. Realizar análise de risco da atividade",
        "2. Bloquear equipamento se necessário",
        "3. Executar atividade conforme procedimento",
        "4. Testar funcionamento",
        "5. Elaborar relatório técnico"
      ],
      ferramentas: [
        "Ferramentas específicas conforme atividade",
        "Instrumentos de medição calibrados",
        "Dispositivos de segurança"
      ],
      epi: [
        "Capacete com jugular",
        "Luvas adequadas à atividade",
        "Óculos de proteção",
        "Protetor auricular",
        "Botina de segurança"
      ],
      consumables: [
        { 
          type: "Óleo", 
          quantity: Math.floor(Math.random() * 50),
          specification: "Conforme especificação do equipamento"
        },
        {
          type: "Graxa",
          quantity: Math.floor(Math.random() * 1000),
          specification: "Conforme especificação do equipamento"
        }
      ]
    });
  }

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
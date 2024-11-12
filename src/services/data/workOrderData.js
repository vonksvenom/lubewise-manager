import { addDays, subDays } from 'date-fns';
import { generateRandomDate } from './utils';
import { initialEquipamentos } from './equipmentData';
import { 
  tipos, 
  titulosPreventiva, 
  titulosCorretiva, 
  titulosPreditiva 
} from './workOrders/workOrderTypes';
import { baseWorkOrders } from './workOrders/baseWorkOrders';

const generateOrdensServico = () => {
  const ordens = [...baseWorkOrders];

  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  const tecnicos = ["3", "5", "6", "7", "8", "9", "10", "11", "12"];

  const now = new Date();
  const startDate = new Date('2024-12-01');
  const endDate = new Date('2025-12-31');
  const timeSpan = endDate.getTime() - startDate.getTime();

  for (let i = 4; i <= 350; i++) {
    const percentComplete = (i - 4) / 346;
    const baseDate = new Date(startDate.getTime() + (timeSpan * percentComplete));
    const dataInicio = new Date(baseDate.getTime() + (Math.random() * 7 * 24 * 60 * 60 * 1000));
    const dataFim = new Date(dataInicio.getTime() + (Math.random() * 14 * 24 * 60 * 60 * 1000));

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
    
    ordens.push({
      id: i.toString(),
      titulo: `${titulo} - ${equipamento.tag}`,
      descricao: `Realizar ${titulo.toLowerCase()} conforme procedimento padrão de manutenção. Incluir relatório técnico e registros fotográficos.`,
      tipo: tipo,
      equipamentoId: equipamento.id,
      status: "Pendente",
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      tecnicoId: tecnicos[Math.floor(Math.random() * tecnicos.length)],
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
        { type: "Material específico", quantity: Math.floor(Math.random() * 10), specification: "Conforme necessidade" }
      ]
    });
  }

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();
import { addDays, subDays } from 'date-fns';
import { generateRandomDate } from './utils';

const generateOrdensServico = () => {
  const ordens = [
    {
      id: "1",
      titulo: "Manutenção Preventiva - Britador Primário",
      descricao: "Realizar inspeção e lubrificação programada do britador primário",
      tipo: "Preventiva",
      equipamentoId: "1",
      status: "Em Andamento",
      dataInicio: "2024-03-15T08:00:00",
      dataFim: "2024-03-15T16:00:00",
      prioridade: "Alta",
      horasEstimadas: 8,
      cip: "CIP-0001",
      tecnicoId: "3",
      procedimentos: [
        "1. Verificar nível de óleo do redutor",
        "2. Inspecionar desgaste das mandíbulas",
        "3. Verificar alinhamento",
        "4. Lubrificar mancais"
      ],
      ferramentas: [
        "Chave de torque",
        "Medidor de vibração",
        "Bomba de graxa"
      ],
      epi: [
        "Capacete",
        "Luvas",
        "Óculos de proteção",
        "Protetor auricular"
      ],
      consumables: [
        { type: "Óleo", quantity: 200, specification: "Shell Omala S2 G 220" },
        { type: "Graxa", quantity: 5, specification: "Shell Gadus S2 V220" }
      ]
    },
    {
      id: "2",
      titulo: "Troca de Rolamentos - Moinho de Bolas",
      descricao: "Substituição programada dos rolamentos principais do moinho de bolas",
      tipo: "Preventiva",
      equipamentoId: "2",
      status: "Pendente",
      dataInicio: "2024-03-20T07:00:00",
      dataFim: "2024-03-21T17:00:00",
      prioridade: "Alta",
      horasEstimadas: 16,
      cip: "CIP-0002",
      tecnicoId: "5",
      procedimentos: [
        "1. Bloquear equipamento",
        "2. Remover proteções",
        "3. Substituir rolamentos",
        "4. Alinhar eixo",
        "5. Lubrificar"
      ],
      ferramentas: [
        "Extrator hidráulico",
        "Aquecedor indutivo",
        "Alinhador a laser"
      ],
      epi: [
        "Capacete",
        "Luvas anti-corte",
        "Óculos de proteção",
        "Protetor auricular"
      ],
      consumables: [
        { type: "Rolamento", quantity: 2, specification: "SKF 23196 CAK/W33" },
        { type: "Graxa", quantity: 10, specification: "SKF LGHP 2" }
      ]
    },
    {
      id: "3",
      titulo: "Manutenção Corretiva - Bomba de Polpa",
      descricao: "Reparo emergencial devido a vazamento no selo mecânico",
      tipo: "Corretiva",
      equipamentoId: "3",
      status: "Concluída",
      dataInicio: "2024-03-10T14:00:00",
      dataFim: "2024-03-10T18:00:00",
      prioridade: "Urgente",
      horasEstimadas: 4,
      cip: "CIP-0003",
      tecnicoId: "6",
      procedimentos: [
        "1. Isolar bomba",
        "2. Drenar fluido",
        "3. Substituir selo mecânico",
        "4. Testar estanqueidade"
      ],
      ferramentas: [
        "Jogo de chaves",
        "Torquímetro",
        "Relógio comparador"
      ],
      epi: [
        "Capacete",
        "Luvas de PVC",
        "Óculos de proteção",
        "Bota de borracha"
      ],
      consumables: [
        { type: "Selo mecânico", quantity: 1, specification: "John Crane Type 1" },
        { type: "Junta", quantity: 2, specification: "Graflex 1/16\"" }
      ]
    }
  ];

  // Gerar ordens futuras
  const now = new Date();
  const startDate = new Date('2024-12-01');
  const endDate = new Date('2025-12-31');
  const timeSpan = endDate.getTime() - startDate.getTime();

  for (let i = 4; i <= 350; i++) {
    const percentComplete = (i - 4) / 346;
    const baseDate = new Date(startDate.getTime() + (timeSpan * percentComplete));
    const dataInicio = new Date(baseDate.getTime() + (Math.random() * 7 * 24 * 60 * 60 * 1000));
    const dataFim = new Date(dataInicio.getTime() + (Math.random() * 14 * 24 * 60 * 60 * 1000));

    const tipos = ["Preventiva", "Corretiva", "Preditiva"];
    const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
    const tecnicos = ["3", "5", "6", "7", "8", "9", "10", "11", "12"];

    ordens.push({
      id: i.toString(),
      titulo: `Manutenção ${tipos[Math.floor(Math.random() * tipos.length)]} - Equipamento ${Math.ceil(Math.random() * 100)}`,
      descricao: `Manutenção programada para o equipamento ${Math.ceil(Math.random() * 100)}`,
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      equipamentoId: Math.ceil(Math.random() * 100).toString(),
      status: "Pendente",
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      tecnicoId: tecnicos[Math.floor(Math.random() * tecnicos.length)],
      procedimentos: [
        "1. Inspeção visual",
        "2. Verificação de parâmetros",
        "3. Lubrificação",
        "4. Testes funcionais"
      ],
      ferramentas: [
        "Ferramentas básicas",
        "Instrumentos de medição",
        "Equipamentos de teste"
      ],
      epi: [
        "Capacete",
        "Luvas",
        "Óculos de proteção",
        "Protetor auricular"
      ],
      consumables: [
        { type: "Óleo", quantity: Math.floor(Math.random() * 10), specification: "Óleo lubrificante padrão" },
        { type: "Graxa", quantity: Math.floor(Math.random() * 5), specification: "Graxa multiuso" }
      ]
    });
  }

  return ordens;
};

export const initialOrdensServico = generateOrdensServico();

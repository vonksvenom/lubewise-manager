import { addDays, subDays } from 'date-fns';
import { generateRandomDate } from './utils';

const generateOrdensServico = () => {
  const ordens = [
    {
      id: "1",
      titulo: "Análise de Vibração - Motor Elétrico ME-001",
      descricao: "Realizar medição e análise de vibração nos mancais do motor elétrico da britagem primária. Verificar desalinhamento, desbalanceamento e condição dos rolamentos.",
      tipo: "Preditiva",
      equipamentoId: "1",
      status: "Em Andamento",
      dataInicio: "2024-03-15T08:00:00",
      dataFim: "2024-03-15T16:00:00",
      prioridade: "Alta",
      horasEstimadas: 8,
      cip: "CIP-0001",
      tecnicoId: "3",
      procedimentos: [
        "1. Coletar dados de vibração nos pontos pré-determinados",
        "2. Analisar espectros de frequência",
        "3. Verificar tendências",
        "4. Elaborar relatório técnico"
      ],
      ferramentas: [
        "Analisador de vibrações CSI 2140",
        "Sensor de temperatura infravermelho",
        "Notebook com software de análise"
      ],
      epi: [
        "Capacete com jugular",
        "Protetor auricular tipo concha",
        "Óculos de proteção",
        "Botina de segurança"
      ],
      consumables: []
    },
    {
      id: "2",
      titulo: "Troca de Óleo - Compressor GA 110",
      descricao: "Realizar troca programada do óleo do compressor de ar após 8000 horas de operação. Incluir troca do elemento separador e filtro de óleo.",
      tipo: "Preventiva",
      equipamentoId: "2",
      status: "Pendente",
      dataInicio: "2024-03-20T07:00:00",
      dataFim: "2024-03-20T15:00:00",
      prioridade: "Media",
      horasEstimadas: 8,
      cip: "CIP-0002",
      tecnicoId: "5",
      procedimentos: [
        "1. Bloquear e sinalizar equipamento",
        "2. Drenar óleo usado",
        "3. Substituir filtro de óleo",
        "4. Substituir elemento separador",
        "5. Abastecer com óleo novo",
        "6. Testar funcionamento"
      ],
      ferramentas: [
        "Jogo de chaves combinadas",
        "Bomba de sucção",
        "Bandeja coletora",
        "Torquímetro"
      ],
      epi: [
        "Capacete",
        "Luvas nitrílicas",
        "Óculos de proteção",
        "Botina de segurança"
      ],
      consumables: [
        { type: "Óleo", quantity: 40, specification: "Atlas Copco Roto-Z Fluid" },
        { type: "Filtro de óleo", quantity: 1, specification: "Atlas Copco 2901-1975-00" },
        { type: "Elemento separador", quantity: 1, specification: "Atlas Copco 2901-1976-00" }
      ]
    },
    {
      id: "3",
      titulo: "Reparo do Selo Mecânico - Bomba BC-003",
      descricao: "Substituição emergencial do selo mecânico da bomba centrífuga devido a vazamento excessivo. Incluir alinhamento do conjunto após montagem.",
      tipo: "Corretiva",
      equipamentoId: "3",
      status: "Concluída",
      dataInicio: "2024-03-10T14:00:00",
      dataFim: "2024-03-10T22:00:00",
      prioridade: "Urgente",
      horasEstimadas: 8,
      cip: "CIP-0003",
      tecnicoId: "6",
      procedimentos: [
        "1. Isolar bomba e drenar fluido",
        "2. Desmontar acoplamento",
        "3. Remover selo mecânico danificado",
        "4. Instalar novo selo mecânico",
        "5. Alinhar conjunto motobomba",
        "6. Testar estanqueidade"
      ],
      ferramentas: [
        "Jogo de chaves combinadas",
        "Extrator de rolamentos",
        "Relógio comparador",
        "Base magnética",
        "Alinhador a laser"
      ],
      epi: [
        "Capacete",
        "Luvas de vaqueta",
        "Óculos de proteção",
        "Protetor facial",
        "Botina de segurança"
      ],
      consumables: [
        { type: "Selo mecânico", quantity: 1, specification: "KSB MG1-45mm" },
        { type: "Junta do corpo", quantity: 1, specification: "KSB 40-125" },
        { type: "O-rings", quantity: 2, specification: "Viton 45x2mm" }
      ]
    }
  ];

  // Gerar ordens futuras com dados realistas
  const tipos = ["Preventiva", "Corretiva", "Preditiva"];
  const titulosPreventiva = [
    "Lubrificação dos Mancais",
    "Troca de Filtros",
    "Alinhamento de Correias",
    "Reaperto Geral",
    "Limpeza do Sistema de Arrefecimento",
    "Troca de Óleo",
    "Calibração de Válvulas",
    "Inspeção de Correias"
  ];
  const titulosCorretiva = [
    "Substituição de Rolamento",
    "Reparo de Vazamento",
    "Troca de Selo Mecânico",
    "Substituição de Acoplamento",
    "Reparo de Bomba",
    "Troca de Motor Elétrico",
    "Reparo de Válvula",
    "Substituição de Mangueira Hidráulica"
  ];
  const titulosPreditiva = [
    "Análise de Vibração",
    "Termografia",
    "Análise de Óleo",
    "Ultrassom",
    "Medição de Espessura",
    "Balanceamento Dinâmico",
    "Alinhamento a Laser",
    "Inspeção Boroscópica"
  ];

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

    const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
    const tecnicos = ["3", "5", "6", "7", "8", "9", "10", "11", "12"];

    ordens.push({
      id: i.toString(),
      titulo: `${titulo} - ${equipamentos[Math.floor(Math.random() * equipamentos.length)].tag}`,
      descricao: `Realizar ${titulo.toLowerCase()} conforme procedimento padrão de manutenção. Incluir relatório técnico e registros fotográficos.`,
      tipo: tipo,
      equipamentoId: Math.ceil(Math.random() * 5).toString(),
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
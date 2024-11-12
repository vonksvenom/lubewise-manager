export const baseWorkOrders = [
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

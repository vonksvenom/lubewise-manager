let ordensServico = [];

export const ordemServicoService = {
  getAll: () => ordensServico,
  add: (ordem) => {
    const newOrdem = { ...ordem, id: Date.now() };
    ordensServico.push(newOrdem);
    return newOrdem;
  },
  update: (id, data) => {
    ordensServico = ordensServico.map((os) =>
      os.id === id ? { ...os, ...data } : os
    );
    return ordensServico.find((os) => os.id === id);
  },
  delete: (id) => {
    ordensServico = ordensServico.filter((os) => os.id !== id);
  },
  importFromExcel: (data) => {
    ordensServico = [...ordensServico, ...data];
  },
  exportTemplate: () => {
    return {
      headers: [
        "Título",
        "Descrição",
        "Equipamento ID",
        "Responsável",
        "Status",
        "Data Início",
        "Data Fim",
        "Prioridade",
        "Horas Estimadas",
      ],
      sampleData: [
        {
          titulo: "Exemplo Manutenção",
          descricao: "Descrição da manutenção",
          equipamentoId: "1",
          responsavel: "João Silva",
          status: "Pendente",
          dataInicio: "2024-03-20",
          dataFim: "2024-03-21",
          prioridade: "Media",
          horasEstimadas: "4",
        },
      ],
    };
  },
};

// Initialize sample data
const today = new Date();
ordensServico = [
  {
    id: 1,
    titulo: "Manutenção Preventiva EQP-001",
    descricao: "Troca de óleo e filtros",
    equipamentoId: "1",
    responsavel: "João Silva",
    status: "Concluída",
    dataInicio: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    dataFim: today,
    prioridade: "Alta",
    horasEstimadas: 4,
    consumables: [
      { type: "Óleo", quantity: 40 },
      { type: "Graxa", quantity: 2 },
    ],
  },
  {
    id: 2,
    titulo: "Inspeção EQP-002",
    descricao: "Inspeção geral dos componentes",
    equipamentoId: "2",
    responsavel: "Maria Santos",
    status: "Em Andamento",
    dataInicio: today,
    dataFim: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    prioridade: "Media",
    horasEstimadas: 2,
    consumables: [
      { type: "Graxa", quantity: 1 },
    ],
  },
  {
    id: 3,
    titulo: "Manutenção Corretiva EQP-003",
    descricao: "Reparo no sistema hidráulico",
    equipamentoId: "3",
    responsavel: "Pedro Oliveira",
    status: "Pendente",
    dataInicio: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    dataFim: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
    prioridade: "Urgente",
    horasEstimadas: 8,
    consumables: [
      { type: "Óleo", quantity: 60 },
      { type: "Graxa", quantity: 3 },
    ],
  },
  {
    id: 4,
    titulo: "Calibração EQP-004",
    descricao: "Calibração de sensores e instrumentos",
    equipamentoId: "4",
    responsavel: "Ana Beatriz",
    status: "Pendente",
    dataInicio: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
    dataFim: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
    prioridade: "Baixa",
    horasEstimadas: 3,
    consumables: [
      { type: "Óleo", quantity: 20 },
    ],
  },
  {
    id: 5,
    titulo: "Manutenção Preditiva EQP-005",
    descricao: "Análise de vibração e termografia",
    equipamentoId: "5",
    responsavel: "Carlos Eduardo",
    status: "Em Andamento",
    dataInicio: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    dataFim: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
    prioridade: "Media",
    horasEstimadas: 6,
    consumables: [
      { type: "Graxa", quantity: 4 },
    ],
  }
];
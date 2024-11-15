export const baseWorkOrders = [
  {
    id: "corr-1",
    titulo: "Reparo Emergencial - Motor Principal",
    descricao: "Falha detectada no motor principal durante operação",
    tipo: "Corretiva",
    status: "Pendente",
    prioridade: "Alta",
    equipamentoId: "1",
    dataInicio: "2024-03-20",
    dataFim: "2024-03-21",
    dataExecucao: "2024-03-20",
    tecnicoId: "tech-1",
    recorrencia: "none"
  },
  {
    id: "corr-2",
    titulo: "Manutenção Corretiva - Sistema Hidráulico",
    descricao: "Vazamento identificado no sistema hidráulico",
    tipo: "Corretiva",
    status: "Em Andamento",
    prioridade: "Alta",
    equipamentoId: "2",
    dataInicio: "2024-03-21",
    dataFim: "2024-03-22",
    dataExecucao: "2024-03-21",
    tecnicoId: "tech-2",
    recorrencia: "none"
  },
  {
    id: "pro-1",
    titulo: "Análise Proativa - Rolamentos",
    descricao: "Análise de vibração nos rolamentos",
    tipo: "Proativa",
    status: "Pendente",
    prioridade: "Media",
    equipamentoId: "3",
    dataInicio: "2024-03-25",
    dataFim: "2024-03-26",
    dataExecucao: "2024-03-25",
    tecnicoId: "tech-3",
    recorrencia: "none"
  },
  // ... Add more sample orders here
];
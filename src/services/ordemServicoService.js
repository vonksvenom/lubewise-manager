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

// Initialize sample data - 300 ordens de serviço
const tiposManutencao = ["Preventiva", "Corretiva", "Preditiva", "Calibração", "Inspeção"];
const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
const responsaveis = ["João Silva", "Maria Santos", "Pedro Oliveira", "Ana Beatriz", "Carlos Eduardo"];

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

ordensServico = Array.from({ length: 300 }, (_, index) => {
  const tipoManutencao = tiposManutencao[Math.floor(Math.random() * tiposManutencao.length)];
  const dataInicio = getRandomDate(new Date(2023, 0, 1), new Date(2025, 11, 31)); // Atualizado para incluir até dezembro de 2025
  const dataFim = new Date(dataInicio);
  dataFim.setDate(dataFim.getDate() + Math.floor(Math.random() * 14) + 1);
  
  const equipamentoId = String(Math.floor(Math.random() * 100) + 1);
  const responsavel = responsaveis[Math.floor(Math.random() * responsaveis.length)];
  
  // Gerar consumíveis realistas baseados no tipo de manutenção
  const consumables = [];
  if (tipoManutencao === "Preventiva" || tipoManutencao === "Corretiva") {
    consumables.push(
      { type: "Óleo", quantity: Math.floor(Math.random() * 100) + 20 },
      { type: "Graxa", quantity: Math.floor(Math.random() * 10) + 1 }
    );
  }
  
  return {
    id: index + 1,
    titulo: `${tipoManutencao} - EQP-${String(equipamentoId).padStart(3, '0')}`,
    descricao: `Manutenção ${tipoManutencao.toLowerCase()} no equipamento EQP-${String(equipamentoId).padStart(3, '0')}`,
    equipamentoId,
    responsavel,
    status: status[Math.floor(Math.random() * status.length)],
    dataInicio,
    dataFim,
    prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
    horasEstimadas: Math.floor(Math.random() * 24) + 1,
    consumables,
    observacoes: `Observações da manutenção ${tipoManutencao.toLowerCase()}`,
    custoEstimado: Math.floor(Math.random() * 10000) + 500,
    custoReal: Math.floor(Math.random() * 12000) + 500,
  };
});
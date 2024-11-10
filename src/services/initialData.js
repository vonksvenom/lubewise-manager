export const initialAreas = [
  { id: "1", nome: "Manutenção", descricao: "Área de manutenção geral", responsavel: "João Silva" },
  { id: "2", nome: "Produção", descricao: "Linha de produção principal", responsavel: "Maria Santos" },
  { id: "3", nome: "Almoxarifado", descricao: "Estoque e materiais", responsavel: "Pedro Oliveira" }
];

export const initialEquipamentos = [
  {
    id: "1",
    nome: "Torno CNC",
    modelo: "TC-2000",
    status: "Operacional",
    ultimaManutencao: "2024-02-01",
    proximaManutencao: "2024-05-01"
  },
  {
    id: "2",
    nome: "Empilhadeira",
    modelo: "EP-500",
    status: "Em Manutenção",
    ultimaManutencao: "2024-01-15",
    proximaManutencao: "2024-03-15"
  },
  {
    id: "3",
    nome: "Compressor",
    modelo: "CP-1000",
    status: "Operacional",
    ultimaManutencao: "2024-02-10",
    proximaManutencao: "2024-04-10"
  }
];

export const initialInventario = [
  {
    id: "1",
    name: "Óleo Lubrificante",
    type: "Óleo",
    quantity: 100,
    unit: "L",
    location: "Prateleira A1",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01"
  },
  {
    id: "2",
    name: "Graxa Industrial",
    type: "Graxa",
    quantity: 50,
    unit: "Kg",
    location: "Prateleira B2",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01"
  },
  {
    id: "3",
    name: "Óleo Hidráulico",
    type: "Óleo",
    quantity: 75,
    unit: "L",
    location: "Prateleira A2",
    area: "Manutenção",
    dataRegistro: "2024-03-01"
  }
];

export const initialOrdensServico = [
  {
    id: "1",
    titulo: "Manutenção Preventiva - Torno CNC",
    descricao: "Realizar manutenção preventiva mensal no torno CNC",
    tipo: "Preventiva",
    equipamentoId: "1",
    status: "Pendente",
    dataInicio: "2024-03-15",
    dataFim: "2024-03-15",
    prioridade: "Media",
    horasEstimadas: 4,
    consumables: [
      { type: "Óleo", quantity: 5 },
      { type: "Graxa", quantity: 2 }
    ]
  },
  {
    id: "2",
    titulo: "Reparo Empilhadeira",
    descricao: "Reparo no sistema hidráulico da empilhadeira",
    tipo: "Corretiva",
    equipamentoId: "2",
    status: "Em Andamento",
    dataInicio: "2024-03-10",
    dataFim: "2024-03-12",
    prioridade: "Alta",
    horasEstimadas: 8,
    consumables: [
      { type: "Óleo", quantity: 10 },
      { type: "Graxa", quantity: 1 }
    ]
  },
  {
    id: "3",
    titulo: "Inspeção Compressor",
    descricao: "Inspeção de rotina no compressor",
    tipo: "Preditiva",
    equipamentoId: "3",
    status: "Concluída",
    dataInicio: "2024-03-05",
    dataFim: "2024-03-05",
    prioridade: "Baixa",
    horasEstimadas: 2,
    consumables: [
      { type: "Óleo", quantity: 2 },
      { type: "Graxa", quantity: 1 }
    ]
  }
];

export const initialUsers = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@exemplo.com",
    password: "admin123",
    role: "Administrador",
    department: "TI",
    isAdmin: true
  },
  {
    id: "2",
    name: "Técnico",
    email: "tecnico@exemplo.com",
    password: "tecnico123",
    role: "Técnico",
    department: "Manutenção",
    isAdmin: false
  },
  {
    id: "3",
    name: "Supervisor",
    email: "supervisor@exemplo.com",
    password: "supervisor123",
    role: "Supervisor",
    department: "Produção",
    isPowerUser: true
  }
];
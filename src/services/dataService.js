// Simple in-memory data store until we have a proper backend
let equipamentos = [];
let ordensServico = [];
let inventario = [];
let users = [];

export const equipamentoService = {
  getAll: () => equipamentos,
  add: (equipamento) => {
    const newEquipamento = { ...equipamento, id: Date.now() };
    equipamentos.push(newEquipamento);
    return newEquipamento;
  },
  update: (id, data) => {
    equipamentos = equipamentos.map((eq) =>
      eq.id === id ? { ...eq, ...data } : eq
    );
    return equipamentos.find((eq) => eq.id === id);
  },
  delete: (id) => {
    equipamentos = equipamentos.filter((eq) => eq.id !== id);
  },
};

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
    // Implementation for Excel import
    ordensServico = [...ordensServico, ...data];
  },
  exportTemplate: () => {
    // Template structure for Excel export
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

export const inventarioService = {
  getAll: () => inventario,
  add: (item) => {
    const newItem = { ...item, id: Date.now() };
    inventario.push(newItem);
    return newItem;
  },
  update: (id, data) => {
    inventario = inventario.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    return inventario.find((item) => item.id === id);
  },
  delete: (id) => {
    inventario = inventario.filter((item) => item.id !== id);
  },
  checkAvailability: (type, quantity) => {
    const item = inventario.find(
      (i) => i.type.toLowerCase() === type.toLowerCase()
    );
    return item ? item.quantity >= quantity : false;
  },
};

export const userService = {
  getAll: () => users,
  add: (user) => {
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    return newUser;
  },
  update: (id, data) => {
    users = users.map((user) =>
      user.id === id ? { ...user, ...data } : user
    );
    return users.find((user) => user.id === id);
  },
  delete: (id) => {
    users = users.filter((user) => user.id !== id);
  },
  getCurrentUser: () => {
    // Implement actual user authentication later
    return users.find((user) => user.isAdmin) || null;
  },
};

// Populate initial data
const populateInitialData = () => {
  // Sample equipment
  equipamentos = [
    { id: 1, nome: "Escavadeira CAT 336", tag: "EQP-001", area: "Mineração", responsavel: "João Silva" },
    { id: 2, nome: "Carregadeira 980H", tag: "EQP-002", area: "Construção", responsavel: "Maria Santos" },
    { id: 3, nome: "Trator D6T", tag: "EQP-003", area: "Terraplanagem", responsavel: "Pedro Oliveira" },
  ];

  // Sample users
  users = [
    { id: 1, nome: "Admin", email: "admin@example.com", isAdmin: true },
    { id: 2, nome: "João Silva", email: "joao@example.com", isAdmin: false },
    { id: 3, nome: "Maria Santos", email: "maria@example.com", isAdmin: false },
  ];

  // Sample inventory
  inventario = [
    { id: 1, name: "Óleo Hidráulico CAT HYDO", type: "Óleo", quantity: 200, unit: "L" },
    { id: 2, name: "Graxa MP", type: "Graxa", quantity: 50, unit: "Kg" },
    { id: 3, name: "Óleo de Motor SAE 15W40", type: "Óleo", quantity: 150, unit: "L" },
  ];

  // Sample work orders
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
  ];
};

// Call the populate function when the module loads
populateInitialData();

// Export all services
export { equipamentoService, ordemServicoService, inventarioService, userService };

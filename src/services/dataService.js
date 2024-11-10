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
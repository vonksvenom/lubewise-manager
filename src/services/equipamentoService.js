let equipamentos = [];

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

// Initialize sample data
equipamentos = [
  { id: 1, nome: "Escavadeira CAT 336", tag: "EQP-001", area: "Mineração", responsavel: "João Silva" },
  { id: 2, nome: "Carregadeira 980H", tag: "EQP-002", area: "Construção", responsavel: "Maria Santos" },
  { id: 3, nome: "Trator D6T", tag: "EQP-003", area: "Terraplanagem", responsavel: "Pedro Oliveira" },
];
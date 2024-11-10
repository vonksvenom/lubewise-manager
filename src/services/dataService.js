// Simple in-memory data store until we have a proper backend
let equipamentos = [];
let ordensServico = [];

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
};
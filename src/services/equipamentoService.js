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

// Initialize sample data - 100 equipamentos
const areas = ["Mineração", "Construção", "Terraplanagem", "Manutenção", "Produção"];
const modelos = ["Escavadeira CAT 336", "Carregadeira 980H", "Trator D6T", "Retroescavadeira 416F2", "Motoniveladora 140K"];
const responsaveis = ["João Silva", "Maria Santos", "Pedro Oliveira", "Ana Beatriz", "Carlos Eduardo"];
const fabricantes = ["Caterpillar", "Volvo", "Komatsu", "John Deere", "Liebherr"];
const status = ["Operacional", "Em Manutenção", "Inativo"];

equipamentos = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `${modelos[Math.floor(Math.random() * modelos.length)]} - ${String(index + 1).padStart(3, '0')}`,
  tag: `EQP-${String(index + 1).padStart(3, '0')}`,
  modelo: modelos[Math.floor(Math.random() * modelos.length)],
  fabricante: fabricantes[Math.floor(Math.random() * fabricantes.length)],
  area: areas[Math.floor(Math.random() * areas.length)],
  responsavel: responsaveis[Math.floor(Math.random() * responsaveis.length)],
  status: status[Math.floor(Math.random() * status.length)],
  numeroSerie: `SN${Math.floor(Math.random() * 1000000)}`,
  dataFabricacao: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
  potencia: `${Math.floor(Math.random() * 500 + 100)}hp`,
  tensao: `${Math.floor(Math.random() * 3 + 1) * 120}V`,
  corrente: `${Math.floor(Math.random() * 100 + 20)}A`,
  ultimaManutencao: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
  proximaManutencao: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
}));
let areas = [];

export const areaService = {
  getAll: () => areas,
  add: (area) => {
    const newArea = { ...area, id: Date.now() };
    areas.push(newArea);
    return newArea;
  },
  update: (id, data) => {
    areas = areas.map((area) =>
      area.id === id ? { ...area, ...data } : area
    );
    return areas.find((area) => area.id === id);
  },
  delete: (id) => {
    areas = areas.filter((area) => area.id !== id);
  },
};

// Initialize sample data
areas = [
  { 
    id: 1, 
    nome: "Área de Produção", 
    descricao: "Área principal de produção",
    responsavel: "João Silva"
  },
  { 
    id: 2, 
    nome: "Manutenção", 
    descricao: "Oficina de manutenção",
    responsavel: "Maria Santos"
  },
  { 
    id: 3, 
    nome: "Almoxarifado", 
    descricao: "Área de armazenamento",
    responsavel: "Pedro Oliveira"
  },
];
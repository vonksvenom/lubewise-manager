export const oilLocations = [
  // Petrobras locations
  {
    id: "10",
    name: "REDUC - Refinaria Duque de Caxias",
    companyId: "6",
    active: true,
    capacity: "239 mil barris/dia",
    type: "Refinaria",
    products: ["Diesel", "Gasolina", "QAV", "Lubrificantes"],
    city: "Duque de Caxias",
    state: "RJ",
    coordinates: { lat: -22.7193, lng: -43.2773 }
  },
  {
    id: "11",
    name: "REPLAN - Refinaria de Paulínia",
    companyId: "6",
    active: true,
    capacity: "434 mil barris/dia",
    type: "Refinaria",
    products: ["Diesel", "Gasolina", "GLP", "Óleo Combustível"],
    city: "Paulínia",
    state: "SP",
    coordinates: { lat: -22.7193, lng: -47.1374 }
  },
  {
    id: "30",
    name: "REVAP - Refinaria Henrique Lage",
    companyId: "6",
    active: true,
    capacity: "252 mil barris/dia",
    type: "Refinaria",
    products: ["Diesel", "Gasolina", "QAV", "Asfalto"],
    city: "São José dos Campos",
    state: "SP",
    coordinates: { lat: -23.1789, lng: -45.8901 }
  },
  {
    id: "31",
    name: "REGAP - Refinaria Gabriel Passos",
    companyId: "6",
    active: true,
    capacity: "166 mil barris/dia",
    type: "Refinaria",
    products: ["Diesel", "Gasolina", "GLP", "Coque"],
    city: "Betim",
    state: "MG",
    coordinates: { lat: -19.9567, lng: -44.1234 }
  },
  // Shell locations
  {
    id: "32",
    name: "Base de Lubrificantes RJ",
    companyId: "11",
    active: true,
    capacity: "30 mil m³",
    type: "Base de Distribuição",
    products: ["Lubrificantes", "Graxas"],
    city: "Rio de Janeiro",
    state: "RJ",
    coordinates: { lat: -22.8901, lng: -43.2345 }
  },
  {
    id: "33",
    name: "Terminal Ilha do Governador",
    companyId: "11",
    active: true,
    capacity: "45 mil m³",
    type: "Terminal",
    products: ["Combustíveis"],
    city: "Rio de Janeiro",
    state: "RJ",
    coordinates: { lat: -22.8123, lng: -43.1987 }
  },
  // Raízen locations
  {
    id: "34",
    name: "Terminal Guarulhos",
    companyId: "12",
    active: true,
    capacity: "90 mil m³",
    type: "Terminal",
    products: ["Combustíveis", "Biocombustíveis"],
    city: "Guarulhos",
    state: "SP",
    coordinates: { lat: -23.4567, lng: -46.5678 }
  },
  {
    id: "35",
    name: "Base Secundária Goiânia",
    companyId: "12",
    active: true,
    capacity: "25 mil m³",
    type: "Base de Distribuição",
    products: ["Combustíveis"],
    city: "Goiânia",
    state: "GO",
    coordinates: { lat: -16.7890, lng: -49.2345 }
  }
];
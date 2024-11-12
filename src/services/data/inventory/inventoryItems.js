import { inventoryTypes } from './inventoryTypes';

export const inventoryItems = [
  {
    name: "Shell Omala S2 G 220",
    type: inventoryTypes.OLEO_ENGRENAGEM,
    quantity: 800,
    unit: "L",
    location: "Almoxarifado Central",
    area: "Britagem Primária",
    minimumStock: 200,
    reorderPoint: 400,
    fornecedor: "Shell",
    aplicacao: "Redutores de baixa rotação",
    shelf: "A-01",
    price: 28.50,
    descricaoComercial: "Shell Omala S2 G 220",
    viscosidade: "220 cSt @ 40°C",
    pontoFluidez: "-18°C",
    pontoFulgor: "240°C",
    indiceViscosidade: 95
  },
  {
    name: "Mobil SHC 630",
    type: inventoryTypes.OLEO_ENGRENAGEM,
    quantity: 1200,
    unit: "L",
    location: "Almoxarifado Central",
    area: "Moagem",
    minimumStock: 300,
    reorderPoint: 600,
    fornecedor: "Mobil",
    aplicacao: "Redutores de alta performance",
    shelf: "A-02",
    price: 45.75,
    descricaoComercial: "Mobil SHC 630",
    viscosidade: "220 cSt @ 40°C",
    pontoFluidez: "-39°C",
    pontoFulgor: "250°C",
    indiceViscosidade: 150
  },
  {
    name: "Texaco Rando HD 46",
    type: inventoryTypes.OLEO_HIDRAULICO,
    quantity: 600,
    unit: "L",
    location: "Almoxarifado Secundário",
    area: "Flotação",
    minimumStock: 150,
    reorderPoint: 300,
    fornecedor: "Texaco",
    aplicacao: "Sistemas Hidráulicos",
    shelf: "A-03",
    price: 35.00,
    descricaoComercial: "Texaco Rando HD 46",
    viscosidade: "46 cSt @ 40°C",
    pontoFluidez: "-33°C",
    pontoFulgor: "204°C",
    indiceViscosidade: 102
  },
  {
    name: "Shell Gadus S2 V220",
    type: inventoryTypes.GRAXA,
    quantity: 400,
    unit: "Kg",
    location: "Almoxarifado Central",
    area: "Filtragem",
    minimumStock: 100,
    reorderPoint: 250,
    fornecedor: "Shell",
    aplicacao: "Rolamentos e mancais",
    shelf: "A-04",
    price: 32.00,
    descricaoComercial: "Shell Gadus S2 V220",
    viscosidade: "220 cSt @ 40°C",
    pontoFluidez: "-20°C",
    pontoFulgor: "180°C",
    indiceViscosidade: 80
  },
  {
    name: "Petrobras Lubrax Compsor PAO 46",
    type: inventoryTypes.OLEO_COMPRESSOR,
    quantity: 300,
    unit: "L",
    location: "Almoxarifado Central",
    area: "Pátio de Estocagem",
    minimumStock: 120,
    reorderPoint: 250,
    fornecedor: "Petrobras",
    aplicacao: "Compressores de ar",
    shelf: "A-05",
    price: 39.99,
    descricaoComercial: "Petrobras Lubrax Compsor PAO 46",
    viscosidade: "46 cSt @ 40°C",
    pontoFluidez: "-54°C",
    pontoFulgor: "238°C",
    indiceViscosidade: 140
  },
  {
    name: "Mobil DTE 25",
    type: inventoryTypes.OLEO_HIDRAULICO,
    quantity: 950,
    unit: "L",
    location: "Almoxarifado Central",
    area: "Carregamento Ferroviário",
    minimumStock: 200,
    reorderPoint: 450,
    fornecedor: "Mobil",
    aplicacao: "Sistemas hidráulicos de alta pressão",
    shelf: "B-01",
    price: 42.30,
    descricaoComercial: "Mobil DTE 25",
    viscosidade: "46 cSt @ 40°C",
    pontoFluidez: "-27°C",
    pontoFulgor: "232°C",
    indiceViscosidade: 98
  },
  {
    name: "Shell Tellus S2 M 68",
    type: inventoryTypes.OLEO_HIDRAULICO,
    quantity: 750,
    unit: "L",
    location: "Almoxarifado Secundário",
    area: "Subestação Elétrica",
    minimumStock: 180,
    reorderPoint: 350,
    fornecedor: "Shell",
    aplicacao: "Sistemas hidráulicos industriais",
    shelf: "B-02",
    price: 38.75,
    descricaoComercial: "Shell Tellus S2 M 68",
    viscosidade: "68 cSt @ 40°C",
    pontoFluidez: "-24°C",
    pontoFulgor: "225°C",
    indiceViscosidade: 95
  },
  {
    name: "Mobil Mobilgrease XHP 222",
    type: inventoryTypes.GRAXA,
    quantity: 320,
    unit: "Kg",
    location: "Almoxarifado Central",
    area: "Tratamento de Água",
    minimumStock: 80,
    reorderPoint: 160,
    fornecedor: "Mobil",
    aplicacao: "Rolamentos de alta velocidade",
    shelf: "B-03",
    price: 45.20,
    descricaoComercial: "Mobil Mobilgrease XHP 222",
    viscosidade: "220 cSt @ 40°C",
    pontoFluidez: "-15°C",
    pontoFulgor: "280°C",
    indiceViscosidade: 130
  },
  {
    name: "Petrobras Lubrax Industrial EGF-PS 2",
    type: inventoryTypes.GRAXA,
    quantity: 280,
    unit: "Kg",
    location: "Almoxarifado Secundário",
    area: "Barragem de Rejeitos",
    minimumStock: 70,
    reorderPoint: 140,
    fornecedor: "Petrobras",
    aplicacao: "Mancais de deslizamento",
    shelf: "B-04",
    price: 29.90,
    descricaoComercial: "Petrobras Lubrax Industrial EGF-PS 2",
    viscosidade: "220 cSt @ 40°C",
    pontoFluidez: "-20°C",
    pontoFulgor: "260°C",
    indiceViscosidade: 95
  },
  {
    name: "Shell Spirax S4 CX 30",
    type: inventoryTypes.OLEO_TRANSMISSAO,
    quantity: 550,
    unit: "L",
    location: "Almoxarifado Central",
    area: "Oficina Mecânica",
    minimumStock: 150,
    reorderPoint: 300,
    fornecedor: "Shell",
    aplicacao: "Transmissões e diferenciais",
    shelf: "C-01",
    price: 36.80,
    descricaoComercial: "Shell Spirax S4 CX 30",
    viscosidade: "30 cSt @ 40°C",
    pontoFluidez: "-30°C",
    pontoFulgor: "235°C",
    indiceViscosidade: 95
  }
];
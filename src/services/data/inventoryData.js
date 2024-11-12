import { generateRandomDate } from './utils';

const generateInventario = () => {
  const items = [
    {
      id: "1",
      name: "Shell Omala S2 G 220",
      type: "Óleo de Engrenagens",
      quantity: 800,
      unit: "L",
      location: "Almoxarifado Central",
      area: "Lubrificação",
      dataRegistro: "2024-03-01",
      minimumStock: 200,
      reorderPoint: 400,
      fornecedor: "Shell",
      aplicacao: "Redutores de baixa rotação",
      shelf: "A-01",
      lastPurchase: "2024-02-15",
      price: 28.50
    },
    {
      id: "2",
      name: "Mobil SHC 630",
      type: "Óleo Sintético",
      quantity: 1200,
      unit: "L",
      location: "Almoxarifado Central",
      area: "Lubrificação",
      dataRegistro: "2024-03-01",
      minimumStock: 300,
      reorderPoint: 600,
      fornecedor: "Mobil",
      aplicacao: "Redutores de alta performance",
      shelf: "A-02",
      lastPurchase: "2024-01-20",
      price: 45.75
    },
    {
      id: "3",
      name: "Texaco Rando HD 46",
      type: "Óleo Hidráulico",
      quantity: 600,
      unit: "L",
      location: "Almoxarifado Secundário",
      area: "Hidráulica",
      dataRegistro: "2024-02-25",
      minimumStock: 150,
      reorderPoint: 300,
      fornecedor: "Texaco",
      aplicacao: "Sistemas Hidráulicos",
      shelf: "A-03",
      lastPurchase: "2024-01-05",
      price: 35.00
    },
    {
      id: "4",
      name: "Shell Tellus S2 M 68",
      type: "Óleo Hidráulico",
      quantity: 400,
      unit: "L",
      location: "Almoxarifado Central",
      area: "Lubrificação",
      dataRegistro: "2024-03-05",
      minimumStock: 100,
      reorderPoint: 250,
      fornecedor: "Shell",
      aplicacao: "Sistemas Hidráulicos",
      shelf: "A-04",
      lastPurchase: "2024-02-10",
      price: 32.00
    },
    {
      id: "5",
      name: "Petrobras Lubrax Compsor PAO 46",
      type: "Óleo de Comprimidos",
      quantity: 300,
      unit: "L",
      location: "Almoxarifado Central",
      area: "Lubrificação",
      dataRegistro: "2024-02-28",
      minimumStock: 120,
      reorderPoint: 250,
      fornecedor: "Petrobras",
      aplicacao: "Compressão de Gás",
      shelf: "A-05",
      lastPurchase: "2024-01-25",
      price: 39.99
    }
  ];

  return items;
};

export const initialInventario = generateInventario();

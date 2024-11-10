import { generateRandomDate } from './utils';

const generateInventario = () => {
  const items = [];
  const types = [
    "Óleo Mineral", "Óleo Sintético", "Óleo Semi-Sintético",
    "Graxa Mineral", "Graxa Sintética", "Graxa de Alta Temperatura",
    "Óleo Hidráulico", "Óleo de Engrenagens", "Óleo de Turbina",
    "Graxa de Rolamentos"
  ];
  const units = {
    "Óleo": "L",
    "Graxa": "Kg"
  };
  const areas = ["Almoxarifado", "Manutenção", "Produção"];
  
  for (let i = 1; i <= 100; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const unit = type.toLowerCase().includes('óleo') ? units["Óleo"] : units["Graxa"];
    
    items.push({
      id: i.toString(),
      name: `${type} ${i}`,
      type,
      quantity: Math.floor(Math.random() * 1000),
      unit,
      location: `Prateleira ${String.fromCharCode(65 + Math.floor(i/20))}${Math.floor(i%20)}`,
      area: areas[Math.floor(Math.random() * areas.length)],
      dataRegistro: generateRandomDate(new Date(2023, 0, 1), new Date()).toISOString(),
      minimumStock: Math.floor(Math.random() * 100),
      reorderPoint: Math.floor(Math.random() * 200)
    });
  }
  return items;
};

export const initialInventario = generateInventario();
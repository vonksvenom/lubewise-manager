let inventario = [];

export const inventarioService = {
  getAll: () => inventario,
  add: (item) => {
    const newItem = { 
      ...item, 
      id: Date.now(),
      dataRegistro: new Date().toISOString()
    };
    inventario.push(newItem);
    return newItem;
  },
  update: (id, data) => {
    inventario = inventario.map((item) =>
      item.id === id ? { 
        ...item, 
        ...data,
        dataAtualizacao: new Date().toISOString() 
      } : item
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

// Initialize sample data
inventario = [
  { 
    id: 1, 
    name: "Óleo Hidráulico CAT HYDO", 
    type: "Óleo", 
    quantity: 200, 
    unit: "L",
    location: "Almoxarifado A - Prateleira 1",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 2, 
    name: "Graxa MP", 
    type: "Graxa", 
    quantity: 50, 
    unit: "Kg",
    location: "Almoxarifado B - Prateleira 3",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 3, 
    name: "Óleo de Motor SAE 15W40", 
    type: "Óleo", 
    quantity: 150, 
    unit: "L",
    location: "Almoxarifado A - Prateleira 2",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
];
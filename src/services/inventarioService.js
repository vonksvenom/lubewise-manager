let inventario = [];
let historicoInventario = [];

export const inventarioService = {
  getAll: () => inventario,
  getAllHistory: () => historicoInventario,
  add: (item) => {
    const newItem = { 
      ...item, 
      id: Date.now(),
      dataRegistro: new Date().toISOString()
    };
    inventario.push(newItem);
    historicoInventario.push({
      ...newItem,
      historicoId: Date.now(),
      tipoOperacao: 'entrada'
    });
    return newItem;
  },
  update: (id, data) => {
    const oldItem = inventario.find(item => item.id === id);
    if (oldItem) {
      historicoInventario.push({
        ...oldItem,
        historicoId: Date.now(),
        tipoOperacao: 'atualização',
        quantidadeAnterior: oldItem.quantity
      });
    }
    
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
    const itemToDelete = inventario.find(item => item.id === id);
    if (itemToDelete) {
      historicoInventario.push({
        ...itemToDelete,
        historicoId: Date.now(),
        tipoOperacao: 'exclusão'
      });
    }
    inventario = inventario.filter((item) => item.id !== id);
  },
  checkAvailability: (type, quantity, area) => {
    const items = inventario.filter(
      (i) => i.type.toLowerCase() === type.toLowerCase() &&
      (!area || i.area === area)
    );
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity >= quantity;
  },
  getTotalByType: (type, area) => {
    return inventario
      .filter(i => 
        i.type.toLowerCase() === type.toLowerCase() &&
        (!area || i.area === area)
      )
      .reduce((sum, item) => sum + item.quantity, 0);
  },
  getHistoricoByPeriod: (startDate, endDate, area) => {
    return historicoInventario.filter(item => {
      const itemDate = new Date(item.dataRegistro);
      return itemDate >= startDate &&
             itemDate <= endDate &&
             (!area || item.area === area);
    });
  }
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
    area: "Almoxarifado",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 2, 
    name: "Graxa MP", 
    type: "Graxa", 
    quantity: 50, 
    unit: "Kg",
    location: "Almoxarifado B - Prateleira 3",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 3, 
    name: "Óleo de Motor SAE 15W40", 
    type: "Óleo", 
    quantity: 150, 
    unit: "L",
    location: "Almoxarifado A - Prateleira 2",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 4, 
    name: "Graxa de Alta Performance", 
    type: "Graxa", 
    quantity: 75, 
    unit: "Kg",
    location: "Almoxarifado B - Prateleira 2",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  },
  { 
    id: 5, 
    name: "Óleo Sintético 5W30", 
    type: "Óleo", 
    quantity: 100, 
    unit: "L",
    location: "Almoxarifado A - Prateleira 3",
    area: "Almoxarifado",
    dataRegistro: "2024-03-01T10:00:00.000Z"
  }
];

// Initialize history with initial inventory
historicoInventario = [
  ...inventario.map(item => ({
    ...item,
    historicoId: Date.now(),
    tipoOperacao: 'inicial'
  })),
  {
    historicoId: Date.now() + 1,
    id: 1,
    name: "Óleo Hidráulico CAT HYDO",
    type: "Óleo",
    quantity: 50,
    unit: "L",
    location: "Almoxarifado A - Prateleira 1",
    area: "Almoxarifado",
    dataRegistro: "2024-03-05T14:30:00.000Z",
    tipoOperacao: 'saída'
  },
  {
    historicoId: Date.now() + 2,
    id: 2,
    name: "Graxa MP",
    type: "Graxa",
    quantity: 25,
    unit: "Kg",
    location: "Almoxarifado B - Prateleira 3",
    area: "Almoxarifado",
    dataRegistro: "2024-03-07T09:15:00.000Z",
    tipoOperacao: 'entrada'
  }
];
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

// Initialize sample data - 200 lubrificantes
const tiposLubrificante = [
  "Óleo Hidráulico",
  "Óleo de Motor",
  "Óleo de Transmissão",
  "Graxa",
  "Fluido de Freio",
  "Óleo Sintético",
  "Óleo para Engrenagens",
  "Fluido de Arrefecimento"
];

const marcasLubrificante = [
  "CAT",
  "Shell",
  "Mobil",
  "Petronas",
  "Castrol",
  "Total",
  "Ipiranga",
  "Texaco"
];

const unidades = ["L", "Kg", "ml"];
const areas = ["Almoxarifado A", "Almoxarifado B", "Almoxarifado C", "Depósito Principal"];

inventario = Array.from({ length: 200 }, (_, index) => {
  const tipo = tiposLubrificante[Math.floor(Math.random() * tiposLubrificante.length)];
  const marca = marcasLubrificante[Math.floor(Math.random() * marcasLubrificante.length)];
  const unidade = tipo === "Graxa" ? "Kg" : "L";
  
  return {
    id: index + 1,
    name: `${marca} ${tipo} ${Math.random() > 0.5 ? 'Premium' : 'Standard'}`,
    type: tipo,
    quantity: Math.floor(Math.random() * 1000 + 100),
    unit: unidade,
    location: `${areas[Math.floor(Math.random() * areas.length)]} - Prateleira ${Math.floor(Math.random() * 20 + 1)}`,
    area: "Almoxarifado",
    dataRegistro: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    lote: `LT${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
    validade: new Date(2024 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
  };
});

// Initialize history with initial inventory and some movements
historicoInventario = [
  ...inventario.map(item => ({
    ...item,
    historicoId: Date.now() + item.id,
    tipoOperacao: 'inicial'
  }))
];

// Add some random movements to history
for (let i = 0; i < 100; i++) {
  const itemOriginal = inventario[Math.floor(Math.random() * inventario.length)];
  historicoInventario.push({
    ...itemOriginal,
    historicoId: Date.now() + i + 1000,
    quantity: Math.floor(Math.random() * 50 + 10),
    dataRegistro: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
    tipoOperacao: Math.random() > 0.5 ? 'entrada' : 'saída'
  });
}

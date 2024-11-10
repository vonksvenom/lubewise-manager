import { addDays, subDays } from 'date-fns';

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateEquipamentos = () => {
  const equipamentos = [];
  const status = ["Operacional", "Em Manutenção", "Inativo"];
  const areas = ["Produção", "Manutenção", "Almoxarifado", "Expedição", "Qualidade"];
  
  for (let i = 1; i <= 100; i++) {
    const dataFabricacao = generateRandomDate(new Date(2015, 0, 1), new Date());
    const ultimaManutencao = generateRandomDate(new Date(2023, 0, 1), new Date());
    const proximaManutencao = generateRandomDate(new Date(), new Date(2024, 11, 31));

    equipamentos.push({
      id: i.toString(),
      nome: `Equipamento ${i}`,
      modelo: `Modelo ${Math.floor(i/3)}`,
      tag: `TAG-${i.toString().padStart(4, '0')}`,
      status: status[Math.floor(Math.random() * status.length)],
      area: areas[Math.floor(Math.random() * areas.length)],
      responsavel: `Responsável ${Math.floor(i/5)}`,
      descricao: `Descrição detalhada do equipamento ${i}`,
      fabricante: `Fabricante ${Math.floor(i/4)}`,
      numeroSerie: `NS${i.toString().padStart(6, '0')}`,
      dataFabricacao: dataFabricacao.toISOString().split('T')[0],
      ultimaManutencao: ultimaManutencao.toISOString().split('T')[0],
      proximaManutencao: proximaManutencao.toISOString().split('T')[0],
      potencia: `${Math.floor(Math.random() * 100)}kW`,
      tensao: `${[220, 380, 440][Math.floor(Math.random() * 3)]}V`,
      corrente: `${Math.floor(Math.random() * 100)}A`,
      imagem: `https://source.unsplash.com/random/800x600?machinery,${i}`
    });
  }
  return equipamentos;
};

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

const generateOrdensServico = () => {
  const ordens = [];
  const tipos = ["Preventiva", "Corretiva", "Preditiva"];
  const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  
  const now = new Date();
  const oneMonthAgo = subDays(now, 30);
  const nextMonth = addDays(now, 30);

  for (let i = 1; i <= 100; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    let dataInicio, dataFim;

    if (i <= 30) {
      dataInicio = generateRandomDate(oneMonthAgo, subDays(now, 5));
      dataFim = generateRandomDate(dataInicio, subDays(now, 1));
    } else if (i <= 60) {
      dataInicio = generateRandomDate(subDays(now, 4), addDays(now, 3));
      dataFim = generateRandomDate(dataInicio, addDays(dataInicio, 5));
    } else {
      dataInicio = generateRandomDate(addDays(now, 4), nextMonth);
      dataFim = generateRandomDate(dataInicio, addDays(dataInicio, 7));
    }

    ordens.push({
      id: i.toString(),
      titulo: `Ordem de Serviço ${i}`,
      descricao: `Descrição detalhada da ordem de serviço ${i}`,
      tipo,
      equipamentoId: Math.ceil(Math.random() * 100).toString(),
      status: status[Math.floor(Math.random() * status.length)],
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      horasEstimadas: Math.floor(Math.random() * 24) + 1,
      cip: `CIP-${i.toString().padStart(4, '0')}`,
      consumables: [
        { type: "Óleo", quantity: Math.floor(Math.random() * 10) },
        { type: "Graxa", quantity: Math.floor(Math.random() * 5) }
      ]
    });
  }
  return ordens;
};

const generateAreas = () => {
  const areas = [];
  for (let i = 1; i <= 100; i++) {
    areas.push({
      id: i.toString(),
      nome: `Área ${i}`,
      descricao: `Descrição da área ${i}`,
      responsavel: `Responsável ${Math.floor(i/3)}`
    });
  }
  return areas;
};

export const initialAreas = generateAreas();
export const initialEquipamentos = generateEquipamentos();
export const initialInventario = generateInventario();
export const initialOrdensServico = generateOrdensServico();

export const initialCompanies = [
  {
    id: "1",
    name: "Empresa Exemplo",
    active: true
  }
];

export const initialUsers = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
    department: "TI",
    isAdmin: true,
    systemOwner: true // Indica que é o dono do sistema
  },
  {
    id: "2",
    name: "Power User",
    email: "pwr@pwr.com",
    password: "pwr123",
    role: "powerUser",
    department: "Gestão",
    isPowerUser: true,
    companyId: "1", // Vinculado à empresa exemplo
    companyName: "Empresa Exemplo"
  },
  {
    id: "3",
    name: "Usuário Comum",
    email: "user@exemplo.com",
    password: "user123",
    role: "user",
    department: "Operacional",
    companyId: "1"
  }
];
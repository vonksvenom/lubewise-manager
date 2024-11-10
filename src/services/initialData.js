import { addDays, subDays } from 'date-fns';

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateEquipamentos = () => {
  const equipamentos = [];
  const status = ["Operacional", "Em Manutenção", "Inativo"];
  const areas = ["Produção", "Manutenção", "Almoxarifado", "Expedição", "Qualidade"];
  
  for (let i = 1; i <= 100; i++) {
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
      dataFabricacao: generateRandomDate(new Date(2015, 0, 1), new Date()).toISOString().split('T')[0],
      ultimaManutencao: generateRandomDate(new Date(2023, 0, 1), new Date()).toISOString().split('T')[0],
      proximaManutencao: generateRandomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0],
      potencia: `${Math.floor(Math.random() * 100)}kW`,
      tensao: `${[220, 380, 440][Math.floor(Math.random() * 3)]}V`,
      corrente: `${Math.floor(Math.random() * 100)}A`
    });
  }
  return equipamentos;
};

const generateInventario = () => {
  const items = [];
  const types = ["Óleo", "Graxa", "Filtro", "Correia", "Rolamento", "Parafuso", "Porca", "Arruela"];
  const units = ["L", "Kg", "Un", "m", "pc"];
  const areas = ["Almoxarifado", "Manutenção", "Produção"];
  
  for (let i = 1; i <= 100; i++) {
    items.push({
      id: i.toString(),
      name: `Item ${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      quantity: Math.floor(Math.random() * 1000),
      unit: units[Math.floor(Math.random() * units.length)],
      location: `Prateleira ${String.fromCharCode(65 + Math.floor(i/20))}${Math.floor(i%20)}`,
      area: areas[Math.floor(Math.random() * areas.length)],
      dataRegistro: generateRandomDate(new Date(2023, 0, 1), new Date()).toISOString()
    });
  }
  return items;
};

const generateOrdensServico = () => {
  const ordens = [];
  const tipos = ["Preventiva", "Corretiva", "Preditiva"];
  const status = ["Pendente", "Em Andamento", "Concluída", "Cancelada"];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];
  
  // Data ranges for different types of orders
  const now = new Date();
  const oneMonthAgo = subDays(now, 30);
  const nextMonth = addDays(now, 30);

  for (let i = 1; i <= 100; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    let dataInicio, dataFim;

    // Distribute orders across past, present and future
    if (i <= 30) { // Vencidas
      dataInicio = generateRandomDate(oneMonthAgo, subDays(now, 5));
      dataFim = generateRandomDate(dataInicio, subDays(now, 1));
    } else if (i <= 60) { // Atuais
      dataInicio = generateRandomDate(subDays(now, 4), addDays(now, 3));
      dataFim = generateRandomDate(dataInicio, addDays(dataInicio, 5));
    } else { // Futuras
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
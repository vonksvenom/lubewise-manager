import { initialTechnicians } from './technicians';

export const initialUsers = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
    department: "Diretoria",
    isAdmin: true,
    systemOwner: true,
    permissions: {
      createUsers: true,
      editUsers: true,
      deleteUsers: true,
      editSettings: true,
      manageCompany: true,
      viewReports: true,
      editEquipments: true,
      editWorkOrders: true,
      editInventory: true,
      editAreas: true
    }
  },
  {
    id: "2",
    name: "Gerente",
    email: "gerente@exemplo.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    permissions: {
      createUsers: false,
      deleteUsers: false,
      editSettings: false,
      manageCompany: false,
      viewReports: true,
      editEquipments: true,
      editWorkOrders: true,
      editInventory: true,
      editAreas: true
    }
  },
  {
    id: "4",
    name: "Operador",
    email: "operador@exemplo.com",
    password: "op123",
    role: "operator",
    department: "Produção",
    isAdmin: false,
    permissions: {
      createUsers: false,
      deleteUsers: false,
      editSettings: false,
      manageCompany: false,
      viewReports: false,
      editEquipments: false,
      editWorkOrders: false,
      editInventory: false,
      editAreas: false
    }
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    password: "tec123",
    role: "technician",
    department: "Manutenção",
    nivel: "junior",
    horasDisponiveis: "8",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "5",
    name: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    password: "tec456",
    role: "technician",
    department: "Manutenção",
    nivel: "senior",
    horasDisponiveis: "8",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "6",
    name: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    password: "tec789",
    role: "technician",
    department: "Manutenção",
    nivel: "pleno",
    horasDisponiveis: "6",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "7",
    name: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    password: "tec101",
    role: "technician",
    department: "Manutenção",
    nivel: "pleno",
    horasDisponiveis: "8",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "8",
    name: "Ana Costa",
    email: "ana.costa@exemplo.com",
    password: "tec123",
    role: "technician",
    nivel: "senior",
    horasDisponiveis: "8",
    department: "Manutenção",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "9",
    name: "Roberto Lima",
    email: "roberto.lima@exemplo.com",
    password: "tec123",
    role: "technician",
    nivel: "pleno",
    horasDisponiveis: "6",
    department: "Manutenção",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "10",
    name: "Fernanda Souza",
    email: "fernanda.souza@exemplo.com",
    password: "tec123",
    role: "technician",
    nivel: "junior",
    horasDisponiveis: "8",
    department: "Manutenção",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "11",
    name: "Ricardo Martins",
    email: "ricardo.martins@exemplo.com",
    password: "tec123",
    role: "technician",
    nivel: "especialista",
    horasDisponiveis: "4",
    department: "Manutenção",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "12",
    name: "Juliana Santos",
    email: "juliana.santos@exemplo.com",
    password: "tec123",
    role: "technician",
    nivel: "senior",
    horasDisponiveis: "8",
    department: "Manutenção",
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  }
];

export const initialCompanies = [
  {
    id: "1",
    name: "Empresa Exemplo",
    active: true
  }
];

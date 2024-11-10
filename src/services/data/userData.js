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
    id: "3",
    name: "Técnico",
    email: "tecnico@exemplo.com",
    password: "tec123",
    role: "technician",
    department: "Manutenção",
    isAdmin: false,
    permissions: {
      createUsers: false,
      deleteUsers: false,
      editSettings: false,
      manageCompany: false,
      viewReports: false,
      editEquipments: false,
      editWorkOrders: true,
      editInventory: true,
      editAreas: false
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
  }
];

export const initialCompanies = [
  {
    id: "1",
    name: "Empresa Exemplo",
    active: true
  }
];

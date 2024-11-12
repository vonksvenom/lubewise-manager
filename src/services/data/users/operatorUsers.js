export const initialOperatorUsers = [
  {
    id: "4",
    name: "Operador Vale",
    email: "operador.vale@exemplo.com",
    password: "op123",
    role: "operator",
    department: "Produção",
    isAdmin: false,
    companyId: "1",
    locationId: "1",
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
    id: "15",
    name: "Operador CSN",
    email: "operador.csn@exemplo.com",
    password: "op123",
    role: "operator",
    department: "Produção",
    isAdmin: false,
    companyId: "2",
    locationId: "6",
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
    id: "16",
    name: "Operador Petrobras",
    email: "operador.petrobras@exemplo.com",
    password: "op123",
    role: "operator",
    department: "Produção",
    isAdmin: false,
    companyId: "3",
    locationId: "10",
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
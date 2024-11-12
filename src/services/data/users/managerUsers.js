export const initialManagerUsers = [
  {
    id: "2",
    name: "Gerente Vale",
    email: "gerente.vale@exemplo.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    companyId: "1",
    locationId: "1",
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
    id: "13",
    name: "Gerente CSN",
    email: "gerente.csn@exemplo.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    companyId: "2",
    locationId: "6",
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
    id: "14",
    name: "Gerente Petrobras",
    email: "gerente.petrobras@exemplo.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    companyId: "3",
    locationId: "10",
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
  }
];
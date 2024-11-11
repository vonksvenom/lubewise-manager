export const initialManagerUsers = [
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
  }
];
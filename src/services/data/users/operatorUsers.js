export const initialOperatorUsers = [
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
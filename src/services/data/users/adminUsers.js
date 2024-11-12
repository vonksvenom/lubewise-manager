export const initialAdminUsers = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
    department: "Diretoria",
    isAdmin: true,
    systemOwner: true,
    companyId: "1",
    locationId: "1",
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
  }
];
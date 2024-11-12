export const initialAdminUsers = [
  {
    id: "1",
    name: "Carlos Eduardo Silva",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
    department: "TI",
    isAdmin: true,
    systemOwner: true,
    companyId: "1",
    locationId: "1",
    phone: "+55 11 98765-4321",
    registrationNumber: "A001",
    startDate: "2020-01-15",
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
export const initialManagerUsers = [
  {
    id: "2",
    name: "Roberto Martins",
    email: "roberto.martins@vale.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    companyId: "1",
    locationId: "1",
    phone: "+55 91 98888-7777",
    registrationNumber: "M001",
    startDate: "2018-03-10",
    specializations: ["Gestão de Ativos", "Manutenção Preditiva"],
    certifications: ["PMP", "CMRP"],
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
    name: "Patricia Santos",
    email: "patricia.santos@csn.com",
    password: "ger123",
    role: "manager",
    department: "Manutenção",
    isAdmin: false,
    companyId: "2",
    locationId: "6",
    phone: "+55 31 97777-6666",
    registrationNumber: "M002",
    startDate: "2019-06-15",
    specializations: ["Gestão de Projetos", "Confiabilidade"],
    certifications: ["Six Sigma Black Belt", "CMRP"],
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
export const initialTechnicianUsers = [
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@vale.com",
    password: "tec123",
    role: "technician",
    department: "Manutenção",
    nivel: "senior",
    horasDisponiveis: "8",
    companyId: "1",
    locationId: "1",
    phone: "+55 91 98765-4321",
    registrationNumber: "T001",
    startDate: "2015-02-01",
    specializations: ["Hidráulica", "Pneumática"],
    certifications: ["NR-10", "NR-35"],
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  },
  {
    id: "5",
    name: "Pedro Santos",
    email: "pedro.santos@vale.com",
    password: "tec456",
    role: "technician",
    department: "Manutenção",
    nivel: "pleno",
    horasDisponiveis: "8",
    companyId: "1",
    locationId: "2",
    phone: "+55 31 98888-9999",
    registrationNumber: "T002",
    startDate: "2017-05-15",
    specializations: ["Mecânica", "Soldagem"],
    certifications: ["NR-10", "NR-33"],
    permissions: {
      editWorkOrders: true,
      editInventory: true,
    }
  }
];
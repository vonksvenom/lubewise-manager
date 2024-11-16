import { excelDataService } from './excelDataService';

let companies = [];
let equipment = [];
let inventory = [];
let locations = [];
let technicians = [];
let users = [];
let workOrders = [];

const loadAllData = async () => {
  try {
    [
      companies,
      equipment,
      inventory,
      locations,
      technicians,
      users,
      workOrders
    ] = await Promise.all([
      excelDataService.loadCompanies(),
      excelDataService.loadEquipment(),
      excelDataService.loadInventory(),
      excelDataService.loadLocations(),
      excelDataService.loadTechnicians(),
      excelDataService.loadUsers(),
      excelDataService.loadWorkOrders()
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Load data on service initialization
loadAllData();

// Export existing services with Excel data
export { equipamentoService } from './equipamentoService';
export { ordemServicoService } from './ordemServicoService';
export { inventarioService } from './inventarioService';
export { userService } from './userService';
export { areaService } from './areaService';
export { companyService } from './companyService';
export { lubrificanteService } from './lubrificanteService';
export { locationService } from './locationService';
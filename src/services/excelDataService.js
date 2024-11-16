import * as XLSX from 'xlsx';

const readExcelFile = async (filename) => {
  try {
    const response = await fetch(`/database/${filename}`);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.error(`Error reading Excel file ${filename}:`, error);
    return [];
  }
};

export const loadCompanies = () => readExcelFile('companies.xlsx');
export const loadEquipment = () => readExcelFile('equipment.xlsx');
export const loadInventory = () => readExcelFile('inventory.xlsx');
export const loadLocations = () => readExcelFile('locations.xlsx');
export const loadTechnicians = () => readExcelFile('technicians.xlsx');
export const loadUsers = () => readExcelFile('users.xlsx');
export const loadWorkOrders = () => readExcelFile('workOrders.xlsx');

export const excelDataService = {
  loadCompanies,
  loadEquipment,
  loadInventory,
  loadLocations,
  loadTechnicians,
  loadUsers,
  loadWorkOrders,
};
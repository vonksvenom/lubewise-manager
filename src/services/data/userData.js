// Split the initial users data into separate files for better organization
import { initialAdminUsers } from './users/adminUsers';
import { initialManagerUsers } from './users/managerUsers';
import { initialTechnicianUsers } from './users/technicianUsers';
import { initialOperatorUsers } from './users/operatorUsers';

export const initialUsers = [
  ...initialAdminUsers,
  ...initialManagerUsers,
  ...initialTechnicianUsers,
  ...initialOperatorUsers
];

export const initialCompanies = [
  {
    id: "1",
    name: "Mineradora Vale",
    active: true
  },
  {
    id: "2",
    name: "Siderúrgica CSN",
    active: true
  },
  {
    id: "3",
    name: "Petrobras Refinaria",
    active: true
  },
  {
    id: "4",
    name: "ArcelorMittal",
    active: true
  },
  {
    id: "5",
    name: "Gerdau Aços",
    active: true
  },
  {
    id: "6",
    name: "Usiminas",
    active: true
  }
];

export const initialLocations = [
  // Vale
  {
    id: "1",
    name: "Complexo Carajás",
    companyId: "1",
    active: true
  },
  {
    id: "2",
    name: "Mina Itabira",
    companyId: "1",
    active: true
  },
  {
    id: "3",
    name: "Porto Tubarão",
    companyId: "1",
    active: true
  },
  {
    id: "4",
    name: "Mina Brucutu",
    companyId: "1",
    active: true
  },
  {
    id: "5",
    name: "Complexo Vargem Grande",
    companyId: "1",
    active: true
  },
  // CSN
  {
    id: "6",
    name: "Volta Redonda",
    companyId: "2",
    active: true
  },
  {
    id: "7",
    name: "Porto de Itaguaí",
    companyId: "2",
    active: true
  },
  {
    id: "8",
    name: "Arcos",
    companyId: "2",
    active: true
  },
  {
    id: "9",
    name: "Congonhas",
    companyId: "2",
    active: true
  },
  // Petrobras
  {
    id: "10",
    name: "REDUC",
    companyId: "3",
    active: true
  },
  {
    id: "11",
    name: "REPLAN",
    companyId: "3",
    active: true
  },
  {
    id: "12",
    name: "REVAP",
    companyId: "3",
    active: true
  },
  {
    id: "13",
    name: "RNEST",
    companyId: "3",
    active: true
  },
  {
    id: "14",
    name: "REGAP",
    companyId: "3",
    active: true
  },
  // ArcelorMittal
  {
    id: "15",
    name: "Tubarão",
    companyId: "4",
    active: true
  },
  {
    id: "16",
    name: "João Monlevade",
    companyId: "4",
    active: true
  },
  {
    id: "17",
    name: "Piracicaba",
    companyId: "4",
    active: true
  },
  {
    id: "18",
    name: "Juiz de Fora",
    companyId: "4",
    active: true
  },
  // Gerdau
  {
    id: "19",
    name: "Ouro Branco",
    companyId: "5",
    active: true
  },
  {
    id: "20",
    name: "Açonorte",
    companyId: "5",
    active: true
  },
  {
    id: "21",
    name: "Cosigua",
    companyId: "5",
    active: true
  },
  {
    id: "22",
    name: "Divinópolis",
    companyId: "5",
    active: true
  },
  {
    id: "23",
    name: "Barão de Cocais",
    companyId: "5",
    active: true
  },
  // Usiminas
  {
    id: "24",
    name: "Ipatinga",
    companyId: "6",
    active: true
  },
  {
    id: "25",
    name: "Cubatão",
    companyId: "6",
    active: true
  },
  {
    id: "26",
    name: "Porto de Praia Mole",
    companyId: "6",
    active: true
  },
  {
    id: "27",
    name: "Mineração Usiminas",
    companyId: "6",
    active: true
  }
];
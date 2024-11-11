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
    name: "Empresa Exemplo",
    active: true
  }
];
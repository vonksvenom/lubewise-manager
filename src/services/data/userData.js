import { miningCompanies } from './companies/miningCompanies';
import { steelCompanies } from './companies/steelCompanies';
import { oilCompanies } from './companies/oilCompanies';
import { miningLocations } from './locations/miningLocations';
import { steelLocations } from './locations/steelLocations';
import { oilLocations } from './locations/oilLocations';
import { initialAdminUsers } from './users/adminUsers';
import { initialManagerUsers } from './users/managerUsers';
import { initialTechnicianUsers } from './users/technicianUsers';
import { initialOperatorUsers } from './users/operatorUsers';

export const initialCompanies = [
  ...miningCompanies,
  ...steelCompanies,
  ...oilCompanies
];

export const initialLocations = [
  ...miningLocations,
  ...steelLocations,
  ...oilLocations
];

export const initialUsers = [
  ...initialAdminUsers,
  ...initialManagerUsers,
  ...initialTechnicianUsers,
  ...initialOperatorUsers
];
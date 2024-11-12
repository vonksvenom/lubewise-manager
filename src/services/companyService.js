import { initialCompanies } from './data/userData';

let companies = [...initialCompanies];

const getAll = () => {
  return companies;
};

const getById = (id) => {
  return companies.find(company => company.id === id);
};

const add = (company) => {
  const newCompany = {
    ...company,
    id: Date.now().toString(),
  };
  companies.push(newCompany);
  return newCompany;
};

const update = (id, company) => {
  const index = companies.findIndex(c => c.id === id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...company };
    return companies[index];
  }
  return null;
};

const remove = (id) => {
  companies = companies.filter(company => company.id !== id);
  return companies;
};

export const companyService = {
  getAll,
  getById,
  add,
  update,
  delete: remove
};
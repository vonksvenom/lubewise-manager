import { initialCompanies } from './initialData';

const STORAGE_KEY = 'companies';

const init = () => {
  const existingCompanies = localStorage.getItem(STORAGE_KEY);
  if (!existingCompanies) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCompanies));
  }
};

const getAll = () => {
  init();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data);
};

const getById = (id) => {
  const companies = getAll();
  return companies.find(company => company.id === id);
};

const add = (company) => {
  const companies = getAll();
  const newCompany = {
    ...company,
    id: Date.now().toString(),
  };
  companies.push(newCompany);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  return newCompany;
};

const update = (id, company) => {
  const companies = getAll();
  const index = companies.findIndex(c => c.id === id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...company };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    return companies[index];
  }
  return null;
};

const remove = (id) => {
  const companies = getAll();
  const filtered = companies.filter(company => company.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const companyService = {
  init,
  getAll,
  getById,
  add,
  update,
  delete: remove
};
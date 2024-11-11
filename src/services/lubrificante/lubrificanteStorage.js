import { initialLubrificantes } from './lubrificanteData';

const STORAGE_KEY = 'lubrificantes';

export const getLubrificantes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLubrificantes));
    return initialLubrificantes;
  }
  return JSON.parse(data);
};

export const saveLubrificantes = (lubrificantes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lubrificantes));
};
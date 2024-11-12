import { initialLubrificantes } from './lubrificanteData';

let lubrificantes = [...initialLubrificantes];

export const getLubrificantes = () => {
  return lubrificantes;
};

export const saveLubrificantes = (newLubrificantes) => {
  lubrificantes = [...newLubrificantes];
  return lubrificantes;
};
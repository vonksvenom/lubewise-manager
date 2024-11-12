import { initialLocations } from './data/userData';

const STORAGE_KEY = 'locations';

const init = () => {
  const existingLocations = localStorage.getItem(STORAGE_KEY);
  if (!existingLocations) {
    // Initialize with initial locations if no locations exist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLocations));
  }
};

const reset = () => {
  // Force reset the locations to initial state
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLocations));
};

const getAll = () => {
  init();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data);
};

const getById = (id) => {
  const locations = getAll();
  return locations.find(location => location.id === id);
};

const add = (location) => {
  const locations = getAll();
  const newLocation = {
    ...location,
    id: Date.now().toString(),
  };
  locations.push(newLocation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  return newLocation;
};

const update = (id, location) => {
  const locations = getAll();
  const index = locations.findIndex(l => l.id === id);
  if (index !== -1) {
    locations[index] = { ...locations[index], ...location };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return locations[index];
  }
  return null;
};

const remove = (id) => {
  const locations = getAll();
  const filtered = locations.filter(location => location.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const locationService = {
  init,
  reset,
  getAll,
  getById,
  add,
  update,
  delete: remove
};
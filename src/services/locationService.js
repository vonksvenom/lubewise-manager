// Mock data for locations
const locations = [
  { id: '1', name: 'São Paulo' },
  { id: '2', name: 'Rio de Janeiro' },
  { id: '3', name: 'Belo Horizonte' },
];

export const locationService = {
  getAll: () => locations,
  getById: (id) => locations.find(location => location.id === id),
  add: (location) => {
    locations.push({ ...location, id: String(locations.length + 1) });
    return location;
  },
  update: (id, location) => {
    const index = locations.findIndex(l => l.id === id);
    if (index !== -1) {
      locations[index] = { ...location, id };
      return locations[index];
    }
    throw new Error('Location not found');
  },
  delete: (id) => {
    const index = locations.findIndex(l => l.id === id);
    if (index !== -1) {
      locations.splice(index, 1);
    }
  }
};
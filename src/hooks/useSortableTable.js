import { useState } from 'react';

export const useSortableTable = (initialData = []) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data, customGetters = {}) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = customGetters[sortConfig.key] 
        ? customGetters[sortConfig.key](a) 
        : a[sortConfig.key];
      let bValue = customGetters[sortConfig.key] 
        ? customGetters[sortConfig.key](b) 
        : b[sortConfig.key];

      // Handle null/undefined values
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';

      // Convert to strings for comparison if they're not numbers
      if (typeof aValue !== 'number') aValue = String(aValue).toLowerCase();
      if (typeof bValue !== 'number') bValue = String(bValue).toLowerCase();

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return { sortConfig, sortData, getSortedData };
};
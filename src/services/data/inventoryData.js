import { inventoryItems } from './inventory/inventoryItems';
import { generateInventoryItem } from './inventory/inventoryUtils';

const generateInventario = () => {
  return inventoryItems.map((item, index) => generateInventoryItem(index + 1, item));
};

export const initialInventario = generateInventario();
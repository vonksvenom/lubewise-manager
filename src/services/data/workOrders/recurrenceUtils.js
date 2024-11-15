import { addDays, addMonths } from 'date-fns';

export const calculateNextDate = (currentDate, recorrencia) => {
  switch (recorrencia) {
    case "daily":
      return addDays(currentDate, 1);
    case "weekly":
      return addDays(currentDate, 7);
    case "biweekly":
      return addDays(currentDate, 14);
    case "monthly":
      return addMonths(currentDate, 1);
    case "bimonthly":
      return addMonths(currentDate, 2);
    case "quarterly":
      return addMonths(currentDate, 3);
    case "fourmonths":
      return addMonths(currentDate, 4);
    case "fivemonths":
      return addMonths(currentDate, 5);
    case "sixmonths":
      return addMonths(currentDate, 6);
    case "sevenmonths":
      return addMonths(currentDate, 7);
    case "eightmonths":
      return addMonths(currentDate, 8);
    case "ninemonths":
      return addMonths(currentDate, 9);
    case "tenmonths":
      return addMonths(currentDate, 10);
    case "elevenmonths":
      return addMonths(currentDate, 11);
    case "yearly":
      return addMonths(currentDate, 12);
    default:
      return null;
  }
};
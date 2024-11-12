import { addMonths, addYears, addDays } from "date-fns";

export const generateRecurringEvents = (ordem, getEquipamentoNome) => {
  const events = [];
  const baseEvent = {
    id: ordem.id,
    title: `${ordem.titulo} - ${getEquipamentoNome(ordem.equipamentoId)}`,
    backgroundColor:
      ordem.status === "Concluída"
        ? "#22c55e"
        : ordem.status === "Em Andamento"
        ? "#3b82f6"
        : ordem.status === "Cancelada"
        ? "#ef4444"
        : "#eab308",
  };

  events.push({
    ...baseEvent,
    start: ordem.dataExecucao,
  });

  if (ordem.recorrencia === "none") return events;

  let currentDate = new Date(ordem.dataExecucao);
  const endDate = addYears(currentDate, 10);

  const recurrenceMap = {
    daily: () => addDays(currentDate, 1),
    weekly: () => addDays(currentDate, 7),
    biweekly: () => addDays(currentDate, 14),
    monthly: () => addMonths(currentDate, 1),
    bimonthly: () => addMonths(currentDate, 2),
    quarterly: () => addMonths(currentDate, 3),
    fourmonths: () => addMonths(currentDate, 4),
    fivemonths: () => addMonths(currentDate, 5),
    sixmonths: () => addMonths(currentDate, 6),
    sevenmonths: () => addMonths(currentDate, 7),
    eightmonths: () => addMonths(currentDate, 8),
    ninemonths: () => addMonths(currentDate, 9),
    tenmonths: () => addMonths(currentDate, 10),
    elevenmonths: () => addMonths(currentDate, 11),
    yearly: () => addYears(currentDate, 1),
  };

  while (currentDate < endDate) {
    const updateDate = recurrenceMap[ordem.recorrencia];
    if (!updateDate) return events;
    
    currentDate = updateDate();

    if (currentDate < endDate) {
      events.push({
        ...baseEvent,
        id: `${ordem.id}-${currentDate.getTime()}`,
        start: currentDate.toISOString(),
        color: "#64748b",
        title: `${ordem.titulo} (Recorrente) - ${getEquipamentoNome(ordem.equipamentoId)}`,
      });
    }
  }

  return events;
};
import { isAfter, isBefore, addWeeks, startOfWeek, addMonths, isWithinInterval } from 'date-fns';

export const calculateTotalAvailableHours = (technicians, timeFrame) => {
  const totalDailyHours = technicians.reduce((total, tech) => 
    total + Number(tech.horasDisponiveis || 0), 0
  );

  switch (timeFrame) {
    case "week":
      return totalDailyHours * 5;
    case "month":
      return totalDailyHours * 22;
    default:
      return totalDailyHours;
  }
};

export const calculateWorkload = (ordensServico, today, timeFrame) => {
  let horasVencidas = 0;
  let horasPrevistas = 0;
  let horasPorTipo = {
    Preventiva: 0,
    Corretiva: 0,
    Preditiva: 0,
    Outros: 0
  };

  ordensServico.forEach(ordem => {
    const dataFim = new Date(ordem.dataFim);
    const dataInicio = new Date(ordem.dataInicio);
    const horasEstimadas = Number(ordem.horasEstimadas) || 0;

    if (ordem.tipo in horasPorTipo) {
      horasPorTipo[ordem.tipo] += horasEstimadas;
    } else {
      horasPorTipo.Outros += horasEstimadas;
    }

    if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
      horasVencidas += horasEstimadas;
    }

    const nextPeriodEnd = timeFrame === "week" 
      ? addWeeks(today, 1) 
      : timeFrame === "month" 
        ? addMonths(today, 1) 
        : new Date(today.setHours(23, 59, 59, 999));

    if (isWithinInterval(dataInicio, { start: today, end: nextPeriodEnd })) {
      horasPrevistas += horasEstimadas;
    }
  });

  return { horasVencidas, horasPrevistas, horasPorTipo };
};
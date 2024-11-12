import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { addMonths, addYears, addDays } from "date-fns";
import { filterOrdens } from "./filterUtils";

export const CalendarContent = ({ ordensServico, filters, handleEventClick, equipamentos }) => {
  const getEquipamentoNome = (equipamentoId) => {
    if (!Array.isArray(equipamentos)) return "N/A";
    const equipamento = equipamentos.find(
      (e) => e.id?.toString() === equipamentoId?.toString()
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const generateRecurringEvents = (ordem) => {
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

    while (currentDate < endDate) {
      switch (ordem.recorrencia) {
        case "daily":
          currentDate = addDays(currentDate, 1);
          break;
        case "weekly":
          currentDate = addDays(currentDate, 7);
          break;
        case "biweekly":
          currentDate = addDays(currentDate, 14);
          break;
        case "monthly":
          currentDate = addMonths(currentDate, 1);
          break;
        case "bimonthly":
          currentDate = addMonths(currentDate, 2);
          break;
        case "quarterly":
          currentDate = addMonths(currentDate, 3);
          break;
        case "fourmonths":
          currentDate = addMonths(currentDate, 4);
          break;
        case "fivemonths":
          currentDate = addMonths(currentDate, 5);
          break;
        case "sixmonths":
          currentDate = addMonths(currentDate, 6);
          break;
        case "sevenmonths":
          currentDate = addMonths(currentDate, 7);
          break;
        case "eightmonths":
          currentDate = addMonths(currentDate, 8);
          break;
        case "ninemonths":
          currentDate = addMonths(currentDate, 9);
          break;
        case "tenmonths":
          currentDate = addMonths(currentDate, 10);
          break;
        case "elevenmonths":
          currentDate = addMonths(currentDate, 11);
          break;
        case "yearly":
          currentDate = addYears(currentDate, 1);
          break;
        default:
          return events;
      }

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

  const filteredOrdens = ordensServico.filter(ordem => filterOrdens(ordem, filters));
  const events = filteredOrdens.flatMap(generateRecurringEvents);

  return (
    <div className="mt-6">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        locale="pt-br"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventClick={handleEventClick}
        className="bg-background rounded-lg p-4 shadow-neo-sm"
      />
    </div>
  );
};
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { addMonths, addYears, addDays } from "date-fns";
import { filterOrdens } from "./filterUtils";
import { Card } from "@/components/ui/card";

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
    <Card className="mt-4 p-4 shadow-neo bg-gradient-to-br from-background/80 to-muted/30 backdrop-blur-sm">
      <div className="fullcalendar-custom">
        <style>
          {`
            .fullcalendar-custom .fc {
              max-height: calc(100vh - 350px);
              min-height: 550px;
            }
            .fullcalendar-custom .fc-toolbar-title {
              font-size: 1.25rem !important;
              font-weight: 600;
              color: var(--foreground);
            }
            .fullcalendar-custom .fc-button {
              background: var(--primary) !important;
              border: none !important;
              box-shadow: var(--shadow-neo-sm);
              transition: all 0.2s;
              text-transform: capitalize;
              padding: 0.5rem 1rem;
            }
            .fullcalendar-custom .fc-button:hover {
              opacity: 0.9;
              transform: translateY(-1px);
              box-shadow: var(--shadow-neo);
            }
            .fullcalendar-custom .fc-button-active {
              background: var(--primary) !important;
              opacity: 0.8;
            }
            .fullcalendar-custom .fc-toolbar {
              flex-wrap: wrap;
              gap: 1rem;
              margin-bottom: 1.5rem !important;
            }
            .fullcalendar-custom .fc-view {
              background: var(--background);
              border-radius: 0.75rem;
              overflow: hidden;
              box-shadow: var(--shadow-neo-sm);
              border: 1px solid var(--border);
            }
            .fullcalendar-custom .fc-scrollgrid {
              border: none !important;
            }
            .fullcalendar-custom .fc-scrollgrid td {
              border: 1px solid var(--border) !important;
            }
            .fullcalendar-custom .fc-col-header-cell {
              background: var(--muted);
              padding: 1rem 0.5rem;
              font-weight: 600;
              color: var(--foreground);
            }
            .fullcalendar-custom .fc-daygrid-day {
              min-height: 80px !important;
              max-height: 120px !important;
              transition: background-color 0.2s;
            }
            .fullcalendar-custom .fc-daygrid-day:hover {
              background: var(--accent);
            }
            .fullcalendar-custom .fc-daygrid-day-number {
              font-size: 0.875rem;
              padding: 0.5rem;
              color: var(--foreground);
            }
            .fullcalendar-custom .fc-daygrid-day-events {
              margin: 0 !important;
              padding: 0 0.25rem;
            }
            .fullcalendar-custom .fc-event {
              margin: 1px 0 !important;
              padding: 2px 4px !important;
              font-size: 0.75rem !important;
              border-radius: 4px !important;
              cursor: pointer !important;
              border: none !important;
              transition: transform 0.2s, box-shadow 0.2s;
            }
            .fullcalendar-custom .fc-event:hover {
              transform: translateX(2px);
              box-shadow: var(--shadow-neo-sm);
            }
            .fullcalendar-custom .fc-more-link {
              font-size: 0.75rem !important;
              padding: 2px 4px !important;
              margin: 2px 0 !important;
              background: var(--accent);
              color: var(--foreground);
              border-radius: 4px;
              transition: all 0.2s;
            }
            .fullcalendar-custom .fc-more-link:hover {
              background: var(--muted);
              text-decoration: none;
            }
            .fullcalendar-custom .fc-day-today {
              background: var(--accent) !important;
            }
            .fullcalendar-custom .fc-popover {
              background: var(--background);
              border: 1px solid var(--border);
              box-shadow: var(--shadow-neo);
              border-radius: 0.5rem;
            }
            .fullcalendar-custom .fc-popover-header {
              background: var(--muted);
              padding: 0.5rem;
              color: var(--foreground);
            }
          `}
        </style>
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
          dayMaxEvents={3}
          className="bg-background rounded-lg"
        />
      </div>
    </Card>
  );
};
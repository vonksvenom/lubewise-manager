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
    <Card className="mt-6 p-6 shadow-neo bg-gradient-to-br from-background to-muted/50">
      <div className="fullcalendar-custom">
        <style>
          {`
            .fullcalendar-custom .fc-toolbar-title {
              font-size: 1.25rem !important;
              font-weight: 600;
            }
            .fullcalendar-custom .fc-button {
              background-color: hsl(var(--primary)) !important;
              border-color: hsl(var(--primary)) !important;
              box-shadow: var(--shadow-neo-sm);
              transition: all 0.2s;
            }
            .fullcalendar-custom .fc-button:hover {
              opacity: 0.9;
              box-shadow: var(--shadow-neo);
            }
            .fullcalendar-custom .fc-button-active {
              background-color: hsl(var(--primary)/0.8) !important;
            }
            .fullcalendar-custom .fc-toolbar {
              flex-wrap: wrap;
              gap: 1rem;
            }
            .fullcalendar-custom .fc-view {
              background: white;
              border-radius: 0.5rem;
              overflow: hidden;
              box-shadow: var(--shadow-neo-sm);
            }
            .fullcalendar-custom .fc-header-toolbar {
              margin-bottom: 1.5rem !important;
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
          className="bg-background rounded-lg"
        />
      </div>
    </Card>
  );
};
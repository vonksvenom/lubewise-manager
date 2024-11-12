import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { filterOrdens } from "./filterUtils";
import { Card } from "@/components/ui/card";
import { CalendarStyles } from "./calendar/CalendarStyles";
import { generateRecurringEvents } from "./calendar/EventGenerator";

export const CalendarContent = ({ ordensServico, filters, handleEventClick, equipamentos }) => {
  const getEquipamentoNome = (equipamentoId) => {
    if (!Array.isArray(equipamentos)) return "N/A";
    const equipamento = equipamentos.find(
      (e) => e.id?.toString() === equipamentoId?.toString()
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const filteredOrdensServico = ordensServico.filter(ordem => filterOrdens(ordem, filters));
  
  const events = filteredOrdensServico.map(ordem => ({
    id: ordem.id,
    title: `${ordem.tipo} - ${getEquipamentoNome(ordem.equipamentoId)}`,
    start: ordem.dataExecucao || ordem.dataInicio,
    end: ordem.dataFim,
    backgroundColor: ordem.status === "Concluída" 
      ? "#22c55e"
      : ordem.status === "Em Andamento"
      ? "#3b82f6"
      : ordem.status === "Cancelada"
      ? "#ef4444"
      : "#eab308",
    borderColor: "transparent",
    textColor: "#fff",
    extendedProps: {
      status: ordem.status,
      tipo: ordem.tipo,
      equipamento: getEquipamentoNome(ordem.equipamentoId)
    }
  }));

  return (
    <Card className="mt-4 overflow-hidden border-border/50">
      <div className="fullcalendar-custom">
        <CalendarStyles />
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
          eventContent={renderEventContent}
          views={{
            dayGridMonth: {
              dayMaxEvents: 3,
              moreLinkText: info => `+${info.num} mais`,
              moreLinkClick: "popover"
            },
            dayGridWeek: {
              dayMaxEvents: false
            }
          }}
        />
      </div>
    </Card>
  );
};

const renderEventContent = (eventInfo) => {
  const { tipo, status } = eventInfo.event.extendedProps;
  
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="font-medium truncate">
        {eventInfo.event.title}
      </div>
      <div className="flex items-center gap-1 text-[10px] opacity-90">
        <span className="font-medium">{status}</span>
      </div>
    </div>
  );
};
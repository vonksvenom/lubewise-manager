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
  const events = filteredOrdensServico.flatMap(ordem => 
    generateRecurringEvents(ordem, getEquipamentoNome)
  );

  return (
    <Card className="mt-4 p-4 shadow-neo bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm border border-border/50">
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
          className="bg-transparent rounded-xl"
        />
      </div>
    </Card>
  );
};
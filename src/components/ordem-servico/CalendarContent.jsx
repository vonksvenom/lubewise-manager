import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { filterOrdens } from "./filterUtils";
import { Card } from "@/components/ui/card";
import { CalendarStyles } from "./calendar/CalendarStyles";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock } from "lucide-react";

export const CalendarContent = ({ ordensServico, filters, handleEventClick, equipamentos }) => {
  const getEquipamentoNome = (equipamentoId) => {
    if (!Array.isArray(equipamentos)) return "N/A";
    const equipamento = equipamentos.find(
      (e) => e.id?.toString() === equipamentoId?.toString()
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Preventiva":
        return "#3b82f6"; // blue-500
      case "Corretiva":
        return "#f97316"; // orange-500
      case "Preditiva":
        return "#8b5cf6"; // purple-500
      default:
        return "#64748b"; // slate-500
    }
  };

  const filteredOrdensServico = ordensServico.filter(ordem => filterOrdens(ordem, filters));
  
  const events = filteredOrdensServico.map(ordem => ({
    id: ordem.id,
    title: `${ordem.tipo} - ${getEquipamentoNome(ordem.equipamentoId)}`,
    start: ordem.dataExecucao || ordem.dataInicio,
    end: ordem.dataFim,
    backgroundColor: getTipoColor(ordem.tipo),
    borderColor: "transparent",
    textColor: "#fff",
    extendedProps: {
      status: ordem.status,
      tipo: ordem.tipo,
      equipamento: getEquipamentoNome(ordem.equipamentoId),
      horasEstimadas: ordem.horasEstimadas || 0
    }
  }));

  // Calcular horas totais por dia
  const horasPorDia = events.reduce((acc, event) => {
    const date = new Date(event.start).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + Number(event.extendedProps.horasEstimadas);
    return acc;
  }, {});

  return (
    <Card className="mt-4 overflow-hidden border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <DashboardCard>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Preventivas</p>
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Corretivas</p>
              <div className="w-3 h-3 rounded-full bg-orange-500" />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Preditivas</p>
              <div className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Outras</p>
              <div className="w-3 h-3 rounded-full bg-slate-500" />
            </div>
          </div>
        </DashboardCard>
      </div>

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
              moreLinkText: (n) => `+${n} mais`,
              moreLinkClick: "popover"
            },
            dayGridWeek: {
              dayMaxEvents: false
            }
          }}
          dayCellContent={(args) => {
            const date = args.date.toISOString().split('T')[0];
            const horasDia = horasPorDia[date] || 0;
            return {
              html: `
                <div class="text-xs">
                  <div>${args.dayNumberText}</div>
                  ${horasDia > 0 ? `<div class="text-xs text-muted-foreground mt-1">${horasDia}h</div>` : ''}
                </div>
              `
            };
          }}
        />
      </div>
    </Card>
  );
};

const renderEventContent = (eventInfo) => {
  const { tipo, status, horasEstimadas } = eventInfo.event.extendedProps;
  
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="font-medium truncate">
        {eventInfo.event.title}
      </div>
      <div className="flex items-center gap-1 text-[10px] opacity-90">
        <span className="font-medium">{status}</span>
        {horasEstimadas && (
          <span className="ml-1">({horasEstimadas}h)</span>
        )}
      </div>
    </div>
  );
};
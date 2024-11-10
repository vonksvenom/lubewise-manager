import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";

const Calendario = () => {
  const ordensServico = [
    {
      id: 1,
      titulo: "Manutenção Preventiva",
      dataInicio: new Date(),
      dataFim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ];

  const events = ordensServico.map((ordem) => ({
    id: ordem.id,
    title: ordem.titulo,
    start: ordem.dataInicio,
    end: ordem.dataFim,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendário</h1>
      <Card className="p-6">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          locale="pt-br"
        />
      </Card>
    </div>
  );
};

export default Calendario;
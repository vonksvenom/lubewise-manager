import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { ordemServicoService, equipamentoService } from "@/services/dataService";

const Calendario = () => {
  const [ordensServico, setOrdensServico] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    setOrdensServico(ordemServicoService.getAll());
    setEquipamentos(equipamentoService.getAll());
  }, []);

  const getEquipamentoNome = (equipamentoId) => {
    const equipamento = equipamentos.find(
      (e) => e.id.toString() === equipamentoId
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const events = ordensServico.map((ordem) => ({
    id: ordem.id,
    title: `${ordem.titulo} - ${getEquipamentoNome(ordem.equipamentoId)}`,
    start: ordem.dataInicio,
    end: ordem.dataFim,
    backgroundColor:
      ordem.status === "Concluída"
        ? "#22c55e"
        : ordem.status === "Em Andamento"
        ? "#3b82f6"
        : ordem.status === "Cancelada"
        ? "#ef4444"
        : "#eab308",
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
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
        />
      </Card>
    </div>
  );
};

export default Calendario;
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ordemServicoService, equipamentoService } from "@/services/dataService";
import { initialEquipamentos } from "@/services/data/equipmentData";
import OrdemServicoViewDialog from "@/components/ordem-servico/OrdemServicoViewDialog";
import BalanceamentoDialog from "@/components/ordem-servico/BalanceamentoDialog";
import { Scale } from "lucide-react";

const Calendario = () => {
  const [ordensServico, setOrdensServico] = useState([]);
  const [equipamentos, setEquipamentos] = useState(initialEquipamentos);
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [balanceamentoOpen, setBalanceamentoOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const equipData = await equipamentoService.getAll();
        setEquipamentos(Array.isArray(equipData) ? equipData : initialEquipamentos);
        setOrdensServico(ordemServicoService.getAll());
      } catch (error) {
        console.error("Error loading data:", error);
        setEquipamentos(initialEquipamentos);
      }
    };
    
    loadData();
  }, []);

  const getEquipamentoNome = (equipamentoId) => {
    if (!Array.isArray(equipamentos)) return "N/A";
    const equipamento = equipamentos.find(
      (e) => e.id?.toString() === equipamentoId?.toString()
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const handleEventClick = (info) => {
    const ordem = ordensServico.find(os => os.id === info.event.id);
    setSelectedOrdem(ordem);
    setDialogOpen(true);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendário</h1>
        <Button 
          variant="outline"
          onClick={() => setBalanceamentoOpen(true)}
          className="gap-2"
        >
          <Scale className="h-4 w-4" />
          Balanceamento Automático
        </Button>
      </div>
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
          eventClick={handleEventClick}
        />
      </Card>
      <OrdemServicoViewDialog
        ordem={selectedOrdem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <BalanceamentoDialog 
        open={balanceamentoOpen}
        onOpenChange={setBalanceamentoOpen}
      />
    </div>
  );
};

export default Calendario;
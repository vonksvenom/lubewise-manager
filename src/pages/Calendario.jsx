import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ordemServicoService, equipamentoService } from "@/services/dataService";
import { initialEquipamentos } from "@/services/data/equipmentData";
import OrdemServicoViewDialog from "@/components/ordem-servico/OrdemServicoViewDialog";
import BalanceamentoDialog from "@/components/ordem-servico/BalanceamentoDialog";
import OrdemServicoFilters from "@/components/ordem-servico/OrdemServicoFilters";
import { Scale } from "lucide-react";
import { addMonths, addYears, addDays } from "date-fns";

const Calendario = () => {
  const [ordensServico, setOrdensServico] = useState([]);
  const [equipamentos, setEquipamentos] = useState(initialEquipamentos);
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [balanceamentoOpen, setBalanceamentoOpen] = useState(false);
  const [filters, setFilters] = useState({
    tipo: "Todos",
    tecnicoId: "Todos",
    status: "Todos",
    prioridade: "Todos"
  });

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

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

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

  const filterOrdens = (ordem) => {
    if (filters.tipo !== "Todos" && ordem.tipo !== filters.tipo) return false;
    if (filters.tecnicoId !== "Todos" && ordem.tecnicoId !== filters.tecnicoId) return false;
    if (filters.status !== "Todos" && ordem.status !== filters.status) return false;
    if (filters.prioridade !== "Todos" && ordem.prioridade !== filters.prioridade) return false;
    return true;
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

    // Add the initial event
    events.push({
      ...baseEvent,
      start: ordem.dataExecucao,
    });

    if (ordem.recorrencia === "none") return events;

    // Generate recurring events for 10 years
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
          color: "#64748b", // Different color for recurring events
          title: `${ordem.titulo} (Recorrente) - ${getEquipamentoNome(ordem.equipamentoId)}`,
        });
      }
    }

    return events;
  };

  const filteredOrdens = ordensServico.filter(filterOrdens);
  const events = filteredOrdens.flatMap(generateRecurringEvents);

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
        <OrdemServicoFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
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

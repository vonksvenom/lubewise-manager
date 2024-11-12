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
import { filterOrdens } from "@/components/ordem-servico/filterUtils";
import { CalendarHeader } from "@/components/ordem-servico/CalendarHeader";
import { CalendarContent } from "@/components/ordem-servico/CalendarContent";

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
    prioridade: "Todos",
    equipamentoId: "Todos"
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

  const handleEventClick = (info) => {
    const ordem = ordensServico.find(os => os.id === info.event.id);
    setSelectedOrdem(ordem);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <CalendarHeader 
        setBalanceamentoOpen={setBalanceamentoOpen} 
      />

      <Card className="p-6 shadow-neo bg-gradient-to-br from-muted to-accent/10">
        <OrdemServicoFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          equipamentos={equipamentos}
        />
        
        <CalendarContent 
          ordensServico={ordensServico}
          filters={filters}
          handleEventClick={handleEventClick}
          equipamentos={equipamentos}
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
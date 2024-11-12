import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { userService, ordemServicoService } from "@/services/dataService";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const BalanceamentoDialog = ({ open, onOpenChange }) => {
  const [ordensOtimizadas, setOrdensOtimizadas] = useState([]);
  const [isOptimized, setIsOptimized] = useState(false);

  const getTecnicoNome = (tecnicoId) => {
    const tecnico = userService.getAll().find(
      (u) => u.id === tecnicoId && u.role === "technician"
    );
    return tecnico ? tecnico.name : "N/A";
  };

  useEffect(() => {
    if (open) {
      const ordens = ordemServicoService.getAll();
      setOrdensOtimizadas(ordens);
      setIsOptimized(false);
    }
  }, [open]);

  const balancearOrdens = (ordens, tecnicos) => {
    // Filtrar apenas ordens pendentes ou em andamento
    const ordensAtivas = ordens.filter(o => 
      o.status === "Pendente" || o.status === "Em Andamento"
    );

    // Ordenar por prioridade e data
    const ordensPriorizadas = ordensAtivas.sort((a, b) => {
      if (a.prioridade === "Urgente") return -1;
      if (b.prioridade === "Urgente") return 1;
      if (a.prioridade === "Alta") return -1;
      if (b.prioridade === "Alta") return 1;
      return new Date(a.dataInicio) - new Date(b.dataInicio);
    });

    // Distribuir ordens entre técnicos baseado em horas disponíveis
    const ordensDistribuidas = ordensPriorizadas.map(ordem => {
      const tecnicosDisponiveis = tecnicos.filter(t => 
        Number(t.horasDisponiveis) >= Number(ordem.horasEstimadas || 0)
      );

      if (tecnicosDisponiveis.length === 0) return ordem;

      // Escolher técnico com mais horas disponíveis
      const tecnicoEscolhido = tecnicosDisponiveis.reduce((prev, curr) => 
        Number(prev.horasDisponiveis) > Number(curr.horasDisponiveis) ? prev : curr
      );

      return {
        ...ordem,
        tecnicoId: tecnicoEscolhido.id,
        backgroundColor: ordem.status === "Em Andamento" ? "#3b82f6" : "#eab308",
      };
    });

    return ordensDistribuidas;
  };

  const handleOptimize = () => {
    const ordens = ordemServicoService.getAll();
    const tecnicos = userService.getAll().filter(u => u.role === "technician");
    const ordensBalanceadas = balancearOrdens(ordens, tecnicos);
    setOrdensOtimizadas(ordensBalanceadas);
    setIsOptimized(true);
  };

  const handleConfirm = () => {
    try {
      // Atualizar cada ordem de serviço no banco de dados
      ordensOtimizadas.forEach(ordem => {
        ordemServicoService.update(ordem.id, ordem);
      });
      
      toast.success("Balanceamento aplicado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao aplicar o balanceamento");
      console.error(error);
    }
  };

  const events = ordensOtimizadas.map(ordem => ({
    id: ordem.id,
    title: `${ordem.titulo} - ${ordem.tecnicoId ? getTecnicoNome(ordem.tecnicoId) : 'Não atribuído'}`,
    start: ordem.dataInicio,
    end: ordem.dataFim,
    backgroundColor: ordem.backgroundColor,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Balanceamento Automático de Ordens</DialogTitle>
        </DialogHeader>
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
        <DialogFooter className="flex justify-between mt-4">
          {!isOptimized ? (
            <Button onClick={handleOptimize}>
              Otimizar Programação
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOptimized(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>
                Confirmar Balanceamento
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BalanceamentoDialog;
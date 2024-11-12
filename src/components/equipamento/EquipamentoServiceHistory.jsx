import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ordemServicoService, userService } from "@/services/dataService";
import { useState } from "react";
import OrdemServicoViewDialog from "../ordem-servico/OrdemServicoViewDialog";
import OrdemServicoForm from "../OrdemServicoForm";
import ServiceOrderCard from "./ServiceOrderCard";

const EquipamentoServiceHistory = ({ equipamentoId, open, onOpenChange }) => {
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const ordensServico = ordemServicoService.getAll().filter(
    (ordem) => ordem.equipamentoId === equipamentoId
  );

  const sortedOrdens = ordensServico.sort((a, b) => 
    new Date(b.dataInicio) - new Date(a.dataInicio)
  );

  const getTecnicoNome = (tecnicoId) => {
    const tecnico = userService.getAll().find(
      (u) => u.id === tecnicoId && u.role === "technician"
    );
    return tecnico ? tecnico.name : "N/A";
  };

  const getStatusDisplay = (ordem) => {
    const now = new Date();
    const dataFim = new Date(ordem.dataFim);
    
    if (ordem.status === "Concluída") {
      if (dataFim < ordem.dataConclusao) {
        return {
          label: "Concluída com Atraso",
          className: "bg-orange-100 text-orange-800"
        };
      }
      return {
        label: "Concluída",
        className: "bg-green-100 text-green-800"
      };
    }
    
    if (ordem.status !== "Concluída" && dataFim < now) {
      return {
        label: "Atrasada",
        className: "bg-red-100 text-red-800"
      };
    }

    return {
      label: ordem.status,
      className: ordem.status === "Em Andamento"
        ? "bg-blue-100 text-blue-800"
        : ordem.status === "Cancelada"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800"
    };
  };

  const handleOrdemClick = (ordem) => {
    setSelectedOrdem(ordem);
    setViewDialogOpen(true);
  };

  const handleEdit = (ordem) => {
    setSelectedOrdem(ordem);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedOrdem) => {
    ordemServicoService.update(selectedOrdem.id, updatedOrdem);
    setEditDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Histórico de Ordens de Serviço</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {sortedOrdens.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Nenhuma ordem de serviço encontrada para este equipamento.
              </p>
            ) : (
              <div className="grid gap-4">
                {sortedOrdens.map((ordem) => (
                  <ServiceOrderCard
                    key={ordem.id}
                    ordem={ordem}
                    onEdit={handleEdit}
                    onClick={handleOrdemClick}
                    getTecnicoNome={getTecnicoNome}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <OrdemServicoViewDialog
        ordem={selectedOrdem}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Ordem de Serviço</DialogTitle>
          </DialogHeader>
          {selectedOrdem && (
            <OrdemServicoForm
              initialData={selectedOrdem}
              onSave={handleSaveEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EquipamentoServiceHistory;
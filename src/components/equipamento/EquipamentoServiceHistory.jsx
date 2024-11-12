import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ordemServicoService } from "@/services/dataService";
import { userService } from "@/services/dataService";

const EquipamentoServiceHistory = ({ equipamentoId, open, onOpenChange }) => {
  const ordensServico = ordemServicoService.getAll().filter(
    (ordem) => ordem.equipamentoId === equipamentoId
  );

  // Sort orders by date, with future dates first
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

  return (
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
              {sortedOrdens.map((ordem) => {
                const statusDisplay = getStatusDisplay(ordem);
                const isUpcoming = new Date(ordem.dataInicio) > new Date();
                
                return (
                  <div
                    key={ordem.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ordem.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ordem.descricao}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${statusDisplay.className}`}
                      >
                        {statusDisplay.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Data Início:</span>{" "}
                        {format(new Date(ordem.dataInicio), "dd/MM/yyyy")}
                      </div>
                      <div>
                        <span className="font-medium">Data Fim:</span>{" "}
                        {format(new Date(ordem.dataFim), "dd/MM/yyyy")}
                      </div>
                      <div>
                        <span className="font-medium">Tipo:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            ordem.tipo === "Preventiva"
                              ? "bg-blue-100 text-blue-800"
                              : ordem.tipo === "Corretiva"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {ordem.tipo}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">
                          {isUpcoming ? "Técnico Designado:" : "Executado por:"}
                        </span>{" "}
                        {getTecnicoNome(ordem.tecnicoId)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EquipamentoServiceHistory;
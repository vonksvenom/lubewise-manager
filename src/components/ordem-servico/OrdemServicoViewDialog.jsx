import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useState } from "react";
import { equipamentoService } from "@/services/dataService";
import EquipamentoViewDialog from "../equipamento/EquipamentoViewDialog";

const OrdemServicoViewDialog = ({ ordem, open, onOpenChange }) => {
  const [equipamentoDialogOpen, setEquipamentoDialogOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);

  if (!ordem) return null;

  const handleEquipamentoClick = () => {
    const equipamento = equipamentoService.getById(ordem.equipamentoId);
    setSelectedEquipamento(equipamento);
    setEquipamentoDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{ordem.titulo}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Descrição</h3>
              <p className="text-muted-foreground">{ordem.descricao}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Tipo</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  ordem.tipo === "Preventiva"
                    ? "bg-blue-100 text-blue-800"
                    : ordem.tipo === "Corretiva"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {ordem.tipo}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Status</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  ordem.status === "Concluída"
                    ? "bg-green-100 text-green-800"
                    : ordem.status === "Em Andamento"
                    ? "bg-blue-100 text-blue-800"
                    : ordem.status === "Cancelada"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {ordem.status}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Prioridade</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  ordem.prioridade === "Alta" || ordem.prioridade === "Urgente"
                    ? "bg-red-100 text-red-800"
                    : ordem.prioridade === "Media"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {ordem.prioridade}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">CIP</h3>
                <p className="text-muted-foreground">{ordem.cip}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Equipamento</h3>
              <button
                onClick={handleEquipamentoClick}
                className="text-primary hover:underline font-medium"
              >
                {ordem.equipamentoNome}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Data Início</h3>
                <p className="text-muted-foreground">
                  {format(new Date(ordem.dataInicio), "dd/MM/yyyy")}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Data Fim</h3>
                <p className="text-muted-foreground">
                  {format(new Date(ordem.dataFim), "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            {ordem.consumables && ordem.consumables.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Consumíveis</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {ordem.consumables.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      {item.commercialName}: {item.quantity} {item.unit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <EquipamentoViewDialog
        equipamento={selectedEquipamento}
        open={equipamentoDialogOpen}
        onOpenChange={setEquipamentoDialogOpen}
      />
    </>
  );
};

export default OrdemServicoViewDialog;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format, isBefore } from "date-fns";
import { useState } from "react";
import OrdemServicoViewDialog from "./ordem-servico/OrdemServicoViewDialog";

const OrdemServicoTable = ({ ordensServico, onEdit, onDelete, equipamentos }) => {
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getEquipamentoNome = (equipamentoId) => {
    const equipamento = equipamentos.find(
      (e) => e.id.toString() === equipamentoId
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const getStatusDisplay = (ordem) => {
    const now = new Date();
    const dataFim = new Date(ordem.dataFim);
    
    if (ordem.status === "Concluída") {
      if (isBefore(dataFim, ordem.dataConclusao)) {
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
    
    if (ordem.status !== "Concluída" && isBefore(dataFim, now)) {
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

  const handleTitleClick = (ordem) => {
    setSelectedOrdem(ordem);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((ordem) => {
              const statusDisplay = getStatusDisplay(ordem);
              return (
                <TableRow key={ordem.id}>
                  <TableCell>
                    <button
                      onClick={() => handleTitleClick(ordem)}
                      className="font-medium text-left hover:underline focus:outline-none"
                    >
                      {ordem.titulo}
                    </button>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        ordem.tipo === "Preventiva"
                          ? "bg-blue-100 text-blue-800"
                          : ordem.tipo === "Corretiva"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {ordem.tipo}
                    </span>
                  </TableCell>
                  <TableCell>{getEquipamentoNome(ordem.equipamentoId)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${statusDisplay.className}`}
                    >
                      {statusDisplay.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        ordem.prioridade === "Alta" || ordem.prioridade === "Urgente"
                          ? "bg-red-100 text-red-800"
                          : ordem.prioridade === "Media"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ordem.prioridade}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(ordem.dataInicio), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(ordem.dataFim), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(ordem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(ordem.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <OrdemServicoViewDialog
        ordem={selectedOrdem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default OrdemServicoTable;
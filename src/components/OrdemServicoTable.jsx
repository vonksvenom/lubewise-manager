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
import { format, isValid, parseISO } from "date-fns";
import { useState } from "react";
import OrdemServicoViewDialog from "./ordem-servico/OrdemServicoViewDialog";
import { userService } from "@/services/dataService";

const OrdemServicoTable = ({ ordensServico, onEdit, onDelete, equipamentos }) => {
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getEquipamentoNome = (equipamentoId) => {
    const equipamento = equipamentos.find(
      (e) => e.id.toString() === equipamentoId
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  const getTecnicoNome = (tecnicoId) => {
    const tecnico = userService.getAll().find(
      (u) => u.id === tecnicoId && u.role === "technician"
    );
    return tecnico ? tecnico.name : "N/A";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "dd/MM/yyyy") : "Data inválida";
    } catch {
      return "Data inválida";
    }
  };

  const getStatusDisplay = (ordem) => {
    const now = new Date();
    
    if (!ordem.dataExecucao) {
      return {
        label: ordem.status || "Pendente",
        className: "bg-yellow-100 text-yellow-800"
      };
    }

    try {
      const dataExecucao = parseISO(ordem.dataExecucao);
      
      if (!isValid(dataExecucao)) {
        return {
          label: ordem.status || "Pendente",
          className: "bg-yellow-100 text-yellow-800"
        };
      }
      
      if (ordem.status === "Concluída") {
        return {
          label: "Concluída",
          className: "bg-green-100 text-green-800"
        };
      }
      
      if (ordem.status !== "Concluída" && dataExecucao < now) {
        return {
          label: "Atrasada",
          className: "bg-red-100 text-red-800"
        };
      }

      return {
        label: ordem.status || "Pendente",
        className: ordem.status === "Em Andamento"
          ? "bg-blue-100 text-blue-800"
          : ordem.status === "Cancelada"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800"
      };
    } catch {
      return {
        label: ordem.status || "Pendente",
        className: "bg-yellow-100 text-yellow-800"
      };
    }
  };

  const handleRowClick = (ordem) => {
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
              <TableHead>Técnico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data de Execução</TableHead>
              <TableHead>Recorrência</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((ordem) => {
              const statusDisplay = getStatusDisplay(ordem);
              return (
                <TableRow 
                  key={ordem.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    if (!e.target.closest('button')) {
                      handleRowClick(ordem);
                    }
                  }}
                >
                  <TableCell>{ordem.titulo}</TableCell>
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
                  <TableCell>{getTecnicoNome(ordem.tecnicoId)}</TableCell>
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
                    {formatDate(ordem.dataExecucao)}
                  </TableCell>
                  <TableCell>
                    {ordem.recorrencia === "none" ? "Sem recorrência" : 
                      RECURRENCE_OPTIONS.find(opt => opt.value === ordem.recorrencia)?.label}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(ordem);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(ordem.id);
                        }}
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import OrdemServicoViewDialog from "./ordem-servico/OrdemServicoViewDialog";
import { userService } from "@/services/dataService";
import StatusBadge from "./ordem-servico/StatusBadge";
import { ActionButtons, RecurrenceCell, formatDate, getStatusDisplay } from "./ordem-servico/TableCells";

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
                    <StatusBadge
                      status={ordem.tipo}
                      className={
                        ordem.tipo === "Preventiva"
                          ? "bg-blue-100 text-blue-800"
                          : ordem.tipo === "Corretiva"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    />
                  </TableCell>
                  <TableCell>{getEquipamentoNome(ordem.equipamentoId)}</TableCell>
                  <TableCell>{getTecnicoNome(ordem.tecnicoId)}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={statusDisplay.label}
                      className={statusDisplay.className}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={ordem.prioridade}
                      className={
                        ordem.prioridade === "Alta" || ordem.prioridade === "Urgente"
                          ? "bg-red-100 text-red-800"
                          : ordem.prioridade === "Media"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    />
                  </TableCell>
                  <TableCell>{formatDate(ordem.dataExecucao)}</TableCell>
                  <RecurrenceCell recorrencia={ordem.recorrencia} />
                  <TableCell className="text-right">
                    <ActionButtons ordem={ordem} onEdit={onEdit} onDelete={onDelete} />
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
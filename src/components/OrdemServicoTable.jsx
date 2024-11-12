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
import { ArrowUpDown } from "lucide-react";
import ResizableTable from "./common/ResizableTable";

const OrdemServicoTable = ({ ordensServico, onEdit, onDelete, equipamentos }) => {
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return ordensServico;

    return [...ordensServico].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'equipamentoId') {
        aValue = getEquipamentoNome(a.equipamentoId);
        bValue = getEquipamentoNome(b.equipamentoId);
      } else if (sortConfig.key === 'tecnicoId') {
        aValue = getTecnicoNome(a.tecnicoId);
        bValue = getTecnicoNome(b.tecnicoId);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = getSortedData();

  const renderSortableHeader = (label, key) => (
    <TableHead 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => sortData(key)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <>
      <ResizableTable>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {renderSortableHeader('Título', 'titulo')}
                {renderSortableHeader('Tipo', 'tipo')}
                {renderSortableHeader('Equipamento', 'equipamentoId')}
                {renderSortableHeader('Técnico', 'tecnicoId')}
                {renderSortableHeader('Status', 'status')}
                {renderSortableHeader('Prioridade', 'prioridade')}
                {renderSortableHeader('Data de Execução', 'dataExecucao')}
                {renderSortableHeader('Recorrência', 'recorrencia')}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((ordem) => {
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
      </ResizableTable>
      <OrdemServicoViewDialog
        ordem={selectedOrdem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default OrdemServicoTable;

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
import { format } from "date-fns";

const OrdemServicoTable = ({ ordensServico, onEdit, onDelete, equipamentos }) => {
  const getEquipamentoNome = (equipamentoId) => {
    const equipamento = equipamentos.find(
      (e) => e.id.toString() === equipamentoId
    );
    return equipamento ? equipamento.nome : "N/A";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Equipamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Data Início</TableHead>
            <TableHead>Data Fim</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordensServico.map((ordem) => (
            <TableRow key={ordem.id}>
              <TableCell className="font-medium">{ordem.titulo}</TableCell>
              <TableCell>{getEquipamentoNome(ordem.equipamentoId)}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    ordem.status === "Concluída"
                      ? "bg-green-100 text-green-800"
                      : ordem.status === "Em Andamento"
                      ? "bg-blue-100 text-blue-800"
                      : ordem.status === "Cancelada"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {ordem.status}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdemServicoTable;
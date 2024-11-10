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

const EquipamentoTable = ({ equipamentos, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Última Manutenção</TableHead>
            <TableHead>Próxima Manutenção</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipamentos.map((equip) => (
            <TableRow key={equip.id}>
              <TableCell className="font-medium">{equip.nome}</TableCell>
              <TableCell>{equip.modelo}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    equip.status === "Operacional"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {equip.status}
                </span>
              </TableCell>
              <TableCell>{equip.ultimaManutencao}</TableCell>
              <TableCell>{equip.proximaManutencao}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(equip)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(equip.id)}
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

export default EquipamentoTable;
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

const EquipamentoActions = ({ equipamento, onView, onEdit, onDelete }) => (
  <TableCell className="text-right">
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => onView(equipamento)}
    >
      <Eye className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => onEdit(equipamento, e)}
    >
      <Edit className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => onDelete(equipamento.id, e)}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  </TableCell>
);

export default EquipamentoActions;
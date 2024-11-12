import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const SubequipamentoRow = ({ subequipamento, depth = 1, onView }) => (
  <TableRow className={`bg-muted/20`}>
    <TableCell style={{ paddingLeft: `${depth * 2}rem` }}>
      {subequipamento.imagem && (
        <img
          src={subequipamento.imagem}
          alt={subequipamento.nome}
          className="w-12 h-12 object-cover rounded-md"
        />
      )}
    </TableCell>
    <TableCell className="font-medium">
      <button
        onClick={() => onView(subequipamento)}
        className="hover:underline text-left flex items-center gap-2"
      >
        <span>└─ {subequipamento.nome}</span>
      </button>
    </TableCell>
    <TableCell>{subequipamento.tag}</TableCell>
    <TableCell>{subequipamento.tipo || "-"}</TableCell>
    <TableCell>-</TableCell>
    <TableCell>-</TableCell>
    <TableCell className="text-right">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(subequipamento)}
      >
        <Eye className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
);

export default SubequipamentoRow;
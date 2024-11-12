import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

const InventarioTableRow = ({ item, viewMode, isAdmin, isPowerUser, onView, onEdit, onDelete }) => (
  <TableRow 
    key={item.id}
    className="cursor-pointer hover:bg-muted/50"
    onClick={() => onView(item)}
  >
    <TableCell>{item.name}</TableCell>
    <TableCell>{viewMode === "tipo" ? item.type : item.descricaoComercial}</TableCell>
    <TableCell>{item.quantity}</TableCell>
    <TableCell>{item.unit}</TableCell>
    <TableCell>{item.location}</TableCell>
    <TableCell>{item.area}</TableCell>
    <TableCell>
      {format(new Date(item.dataRegistro), "dd/MM/yyyy HH:mm")}
    </TableCell>
    <TableCell>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onView(item);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        {(isAdmin || isPowerUser) && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item, e);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id, e);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </TableCell>
  </TableRow>
);

export default InventarioTableRow;
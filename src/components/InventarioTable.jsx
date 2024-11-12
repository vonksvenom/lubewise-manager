import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { inventarioService } from "@/services/dataService";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InventarioForm from "./inventario/InventarioForm";
import { useSortableTable } from "@/hooks/useSortableTable";
import InventarioTableHeader from "./inventario/InventarioTableHeader";
import InventarioTableRow from "./inventario/InventarioTableRow";
import InventarioDetails from "./inventario/InventarioDetails";
import ResizableTable from "./common/ResizableTable";

const InventarioTable = ({ searchTerm, onEdit, viewMode = "tipo", onViewModeChange }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const { isAdmin, isPowerUser } = useAuth();
  const { sortConfig, sortData, getSortedData } = useSortableTable();

  useEffect(() => {
    setItems(inventarioService.getAll());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      inventarioService.delete(id);
      setItems(inventarioService.getAll());
      toast({
        title: "Item excluído",
        description: "O item foi removido do inventário com sucesso.",
      });
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSave = (updatedItem) => {
    if (selectedItem) {
      inventarioService.update(selectedItem.id, updatedItem);
      setItems(inventarioService.getAll());
      toast({
        title: "Item atualizado",
        description: "O item foi atualizado com sucesso.",
      });
    }
    setDialogOpen(false);
    setIsEditing(false);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = getSortedData(filteredItems);

  return (
    <div className="rounded-xl shadow-neo-3d bg-gradient-to-br from-muted to-accent/10 p-4">
      <div className="mb-4 flex justify-end">
        <Select
          value={viewMode}
          onValueChange={onViewModeChange}
          className="w-[200px]"
        >
          <SelectTrigger>
            <SelectValue placeholder="Modo de visualização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tipo">Por Tipo</SelectItem>
            <SelectItem value="descricao">Por Descrição</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResizableTable>
        <Table>
          <InventarioTableHeader 
            viewMode={viewMode}
            sortConfig={sortConfig}
            sortData={sortData}
          />
          <TableBody>
            {sortedItems.map((item) => (
              <InventarioTableRow
                key={item.id}
                item={item}
                viewMode={viewMode}
                isAdmin={isAdmin}
                isPowerUser={isPowerUser}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </ResizableTable>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Item do Inventário" : "Detalhes do Item"}
            </DialogTitle>
          </DialogHeader>
          {isEditing ? (
            <InventarioForm 
              initialData={selectedItem} 
              onSave={(data) => {
                handleSave(data);
                setDialogOpen(false);
              }} 
            />
          ) : (
            <InventarioDetails item={selectedItem} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventarioTable;


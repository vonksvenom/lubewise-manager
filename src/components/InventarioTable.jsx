import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { inventarioService } from "@/services/dataService";
import { format } from "date-fns";
import { useState, useEffect } from "react";
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

const InventarioTable = ({ searchTerm, onEdit, viewMode = "tipo" }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleView = (item, e) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    setSelectedItem(item);
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
  };

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-neo-3d bg-gradient-to-br from-muted to-accent/10 p-4">
      <div className="mb-4 flex justify-end">
        <Select
          value={viewMode}
          onValueChange={(value) => setViewMode(value)}
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>{viewMode === "tipo" ? "Tipo" : "Descrição Comercial"}</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Data Registro</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow 
              key={item.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={(e) => handleView(item, e)}
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
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleEdit(item, e)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Item do Inventário</DialogTitle>
          </DialogHeader>
          <InventarioForm 
            initialData={selectedItem} 
            onSave={(data) => {
              handleSave(data);
              setDialogOpen(false);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventarioTable;
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

const InventarioTable = ({ searchTerm, onEdit }) => {
  const [items, setItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    setItems(inventarioService.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      inventarioService.delete(id);
      setItems(inventarioService.getAll());
      toast({
        title: "Item excluído",
        description: "O item foi removido do inventário com sucesso.",
      });
    }
  };

  const handleEdit = (item) => {
    if (onEdit) {
      onEdit(item);
    } else {
      toast({
        title: "Em desenvolvimento",
        description: "A funcionalidade de edição será implementada em breve.",
      });
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Tipo</TableHead>
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
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
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
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
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
  );
};

export default InventarioTable;
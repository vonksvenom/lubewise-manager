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
import { lubrificanteService } from "@/services/lubrificanteService";
import { useState, useEffect } from "react";

const LubrificanteTable = ({ searchTerm, onEdit }) => {
  const [items, setItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      const data = await lubrificanteService.getAll();
      setItems(data);
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este lubrificante?")) {
      try {
        await lubrificanteService.delete(id);
        const updatedItems = await lubrificanteService.getAll();
        setItems(updatedItems);
        toast({
          title: "Lubrificante excluído",
          description: "O lubrificante foi removido com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o lubrificante.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.nomeComercial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigoLIS?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-neo-3d bg-gradient-to-br from-muted to-accent/10 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome Comercial</TableHead>
            <TableHead>Código LIS</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Viscosidade</TableHead>
            <TableHead>Volume Padrão</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nomeComercial}</TableCell>
              <TableCell>{item.codigoLIS}</TableCell>
              <TableCell>{item.fornecedor}</TableCell>
              <TableCell>{item.viscosidade}</TableCell>
              <TableCell>{item.volumePadrao}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(item)}
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
    </div>
  );
};

export default LubrificanteTable;
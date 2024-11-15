import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { lubrificanteService } from "@/services/lubrificanteService";
import { useState, useEffect } from "react";
import LubrificanteEditDialog from "./LubrificanteEditDialog";
import LubrificanteDetailsDialog from "./LubrificanteDetailsDialog";
import { useSortableTable } from "@/hooks/useSortableTable";
import SortableHeader from "@/components/common/SortableHeader";
import ResizableTable from "../common/ResizableTable";

const LubrificanteTable = ({ searchTerm }) => {
  const [items, setItems] = useState([]);
  const [selectedLubrificante, setSelectedLubrificante] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      const data = await lubrificanteService.getAll();
      setItems(data);
    };
    loadData();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
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

  const handleEdit = (lubrificante, e) => {
    e.stopPropagation();
    setSelectedLubrificante(lubrificante);
    setEditDialogOpen(true);
  };

  const handleRowClick = (lubrificante) => {
    setSelectedLubrificante(lubrificante);
    setDetailsDialogOpen(true);
  };

  const handleSave = async (data) => {
    try {
      await lubrificanteService.update(selectedLubrificante.id, data);
      const updatedItems = await lubrificanteService.getAll();
      setItems(updatedItems);
      setEditDialogOpen(false);
      setSelectedLubrificante(null);
      toast({
        title: "Lubrificante atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const { sortConfig, sortData, getSortedData } = useSortableTable();

  const filteredItems = items.filter(
    (item) =>
      item.nomeComercial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigoLIS?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = getSortedData(filteredItems);

  return (
    <>
      <ResizableTable>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader 
                  label="Nome Comercial"
                  sortKey="nomeComercial"
                  sortConfig={sortConfig}
                  onSort={sortData}
                />
                <SortableHeader 
                  label="Código LIS"
                  sortKey="codigoLIS"
                  sortConfig={sortConfig}
                  onSort={sortData}
                />
                <SortableHeader 
                  label="Fornecedor"
                  sortKey="fornecedor"
                  sortConfig={sortConfig}
                  onSort={sortData}
                />
                <SortableHeader 
                  label="Viscosidade"
                  sortKey="viscosidade"
                  sortConfig={sortConfig}
                  onSort={sortData}
                />
                <SortableHeader 
                  label="Volume Padrão"
                  sortKey="volumePadrao"
                  sortConfig={sortConfig}
                  onSort={sortData}
                />
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.map((item) => (
                <TableRow 
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="cursor-pointer hover:bg-accent/20"
                >
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
        </div>
      </ResizableTable>

      <LubrificanteEditDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        lubrificante={selectedLubrificante}
        onSave={handleSave}
      />

      <LubrificanteDetailsDialog
        isOpen={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        lubrificante={selectedLubrificante}
      />
    </>
  );
};

export default LubrificanteTable;

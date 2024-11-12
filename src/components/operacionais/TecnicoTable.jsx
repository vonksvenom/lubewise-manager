import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { userService } from "@/services/dataService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import TecnicoForm from "./TecnicoForm";
import { useSortableTable } from "@/hooks/useSortableTable";
import SortableHeader from "@/components/common/SortableHeader";

const TecnicoTable = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTecnico, setSelectedTecnico] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { isAdmin, isPowerUser, user } = useAuth();
  const { sortConfig, sortData, getSortedData } = useSortableTable();

  useEffect(() => {
    const loadTecnicos = () => {
      const allUsers = userService.getAll();
      const tecnicosList = allUsers.filter(
        (user) => user.role === "technician"
      );
      setTecnicos(tecnicosList);
    };

    loadTecnicos();
  }, [editDialogOpen]);

  const sortedTecnicos = getSortedData(tecnicos);

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent row click when deleting
    if (window.confirm("Tem certeza que deseja excluir este operacional?")) {
      userService.delete(id);
      setTecnicos(tecnicos.filter((t) => t.id !== id));
      toast.success("Operacional excluído com sucesso!");
    }
  };

  const handleEdit = (tecnico, e) => {
    if (e) {
      e.stopPropagation(); // Prevent row click when clicking edit button
    }
    if (!isAdmin && (!isPowerUser || tecnico.companyId !== user.companyId)) {
      toast.error("Você não tem permissão para editar este operacional");
      return;
    }
    setSelectedTecnico(tecnico);
    setEditDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader 
              label="Nome"
              sortKey="name"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <SortableHeader 
              label="Email"
              sortKey="email"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <SortableHeader 
              label="Nível"
              sortKey="nivel"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <SortableHeader 
              label="Horas Disponíveis/Dia"
              sortKey="horasDisponiveis"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTecnicos.map((tecnico) => (
            <TableRow 
              key={tecnico.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleEdit(tecnico)}
            >
              <TableCell>{tecnico.name}</TableCell>
              <TableCell>{tecnico.email}</TableCell>
              <TableCell>{tecnico.nivel}</TableCell>
              <TableCell>{tecnico.horasDisponiveis}h</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleEdit(tecnico, e)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(tecnico.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TecnicoForm
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialData={selectedTecnico}
      />
    </>
  );
};

export default TecnicoTable;

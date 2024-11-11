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
import { useState, useEffect } from "react";
import { userService } from "@/services/dataService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import TecnicoForm from "./TecnicoForm";

const TecnicoTable = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTecnico, setSelectedTecnico] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { isAdmin, isPowerUser, user } = useAuth();

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

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este técnico?")) {
      userService.delete(id);
      setTecnicos(tecnicos.filter((t) => t.id !== id));
      toast.success("Técnico excluído com sucesso!");
    }
  };

  const handleEdit = (tecnico) => {
    if (!isAdmin && (!isPowerUser || tecnico.companyId !== user.companyId)) {
      toast.error("Você não tem permissão para editar este técnico");
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
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Horas Disponíveis/Dia</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tecnicos.map((tecnico) => (
            <TableRow key={tecnico.id}>
              <TableCell>{tecnico.name}</TableCell>
              <TableCell>{tecnico.email}</TableCell>
              <TableCell>{tecnico.nivel}</TableCell>
              <TableCell>{tecnico.horasDisponiveis}h</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(tecnico)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tecnico.id)}
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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

const UserTable = ({ users, onEdit, onDelete, canEdit }) => {
  const handleView = (user, e) => {
    if (e) {
      e.stopPropagation();
    }
    // Aqui apenas visualizamos o usuário
    onEdit(user); // Reusando o mesmo dialog mas em modo visualização
  };

  const handleEdit = (user, e) => {
    e.stopPropagation();
    onEdit(user);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>Último Acesso</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow 
            key={user.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={(e) => handleView(user, e)}
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.isAdmin ? "Sim" : "Não"}</TableCell>
            <TableCell>
              {user.lastAccess 
                ? format(new Date(user.lastAccess), "dd/MM/yyyy HH:mm")
                : "Nunca acessou"}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleEdit(user, e)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDelete(user.id, e)}
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

export default UserTable;
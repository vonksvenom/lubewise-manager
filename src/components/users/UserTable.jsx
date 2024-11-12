import ResizableTable from "../common/ResizableTable";
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
import { useSortableTable } from "@/hooks/useSortableTable";
import SortableHeader from "@/components/common/SortableHeader";

const UserTable = ({ users, onEdit, onDelete, canEdit }) => {
  const { sortConfig, sortData, getSortedData } = useSortableTable();

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

  const sortedUsers = getSortedData(users);

  return (
    <ResizableTable>
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
            label="Cargo"
            sortKey="role"
            sortConfig={sortConfig}
            onSort={sortData}
          />
          <SortableHeader 
            label="Departamento"
            sortKey="department"
            sortConfig={sortConfig}
            onSort={sortData}
          />
          <SortableHeader 
            label="Admin"
            sortKey="isAdmin"
            sortConfig={sortConfig}
            onSort={sortData}
          />
          <SortableHeader 
            label="Último Acesso"
            sortKey="lastAccess"
            sortConfig={sortConfig}
            onSort={sortData}
          />
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
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
    </ResizableTable>
  );
};

export default UserTable;

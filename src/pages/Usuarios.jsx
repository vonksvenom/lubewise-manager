import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { userService } from "@/services/dataService";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setUsers(userService.getAll());
  }, []);

  const handleAddUser = (userData) => {
    userService.add(userData);
    setUsers(userService.getAll());
    toast({
      title: "Usuário adicionado",
      description: "O usuário foi adicionado com sucesso.",
    });
  };

  const handleDeleteUser = (id) => {
    userService.delete(id);
    setUsers(userService.getAll());
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Usuários</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddUser({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  role: formData.get("role"),
                  department: formData.get("department"),
                  isAdmin: formData.get("isAdmin") === "true",
                });
              }}
              className="space-y-4"
            >
              <Input name="name" placeholder="Nome completo" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="role" placeholder="Cargo" required />
              <Input name="department" placeholder="Departamento" required />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isAdmin"
                  value="true"
                  className="rounded border-gray-300"
                />
                <label className="text-sm">Administrador</label>
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.isAdmin ? "Sim" : "Não"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Usuarios;
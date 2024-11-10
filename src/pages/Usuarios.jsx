import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { userService } from "@/services/dataService";
import { useAuth } from "@/contexts/AuthContext";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";
import ChangePasswordDialog from "@/components/users/ChangePasswordDialog";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, isAdmin, isPowerUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários");
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      department: formData.get("department"),
      isAdmin: formData.get("isAdmin") === "true",
    };

    try {
      if (selectedUser) {
        if (!data.password) {
          delete data.password;
        }
        await userService.update(selectedUser.id, data);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await userService.add(data);
        toast.success("Usuário adicionado com sucesso!");
      }
      const updatedUsers = await userService.getAll();
      setUsers(Array.isArray(updatedUsers) ? updatedUsers : []);
      setSelectedUser(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userService.delete(id);
      const updatedUsers = await userService.getAll();
      setUsers(Array.isArray(updatedUsers) ? updatedUsers : []);
      toast.success("Usuário removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover usuário");
    }
  };

  const filteredUsers = (users || []).filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.name?.toLowerCase() || "").includes(searchLower) ||
      (user.role?.toLowerCase() || "").includes(searchLower) ||
      (user.department?.toLowerCase() || "").includes(searchLower)
    );
  });

  const canEdit = isAdmin() || isPowerUser();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Usuários</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedUser(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              onSubmit={handleSave}
              selectedUser={selectedUser}
              onClose={() => setIsDialogOpen(false)}
            />
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

        <UserTable
          users={filteredUsers}
          onEdit={(user) => {
            setSelectedUser(user);
            setIsDialogOpen(true);
          }}
          onDelete={handleDeleteUser}
          canEdit={canEdit}
        />
      </Card>

      <div className="flex justify-end">
        <ChangePasswordDialog userId={user?.id} />
      </div>
    </div>
  );
};

export default Usuarios;
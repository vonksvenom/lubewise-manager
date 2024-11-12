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
    setUsers(userService.getAll());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      department: formData.get("department"),
      isAdmin: formData.get("isAdmin") === "true",
      isPowerUser: formData.get("isPowerUser") === "true",
      companyId: formData.get("companyId"),
      locationId: formData.get("locationId"),
    };

    try {
      if (selectedUser) {
        if (!data.password) {
          delete data.password;
        }
        userService.update(selectedUser.id, data);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        userService.add(data);
        toast.success("Usuário adicionado com sucesso!");
      }
      setUsers(userService.getAll());
      setSelectedUser(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = (id) => {
    userService.delete(id);
    setUsers(userService.getAll());
    toast.success("Usuário removido com sucesso!");
  };

  const filteredUsers = users.filter((user) => {
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserForm = ({ onSubmit, selectedUser, onClose }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome completo
        </label>
        <Input
          id="name"
          name="name"
          defaultValue={selectedUser?.name}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={selectedUser?.email}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required={!selectedUser}
          placeholder={selectedUser ? "Deixe em branco para manter a senha atual" : "Digite a senha"}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">
          Cargo
        </label>
        <Input
          id="role"
          name="role"
          defaultValue={selectedUser?.role}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="department" className="text-sm font-medium">
          Departamento
        </label>
        <Input
          id="department"
          name="department"
          defaultValue={selectedUser?.department}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isAdmin"
          value="true"
          defaultChecked={selectedUser?.isAdmin}
          className="rounded border-gray-300"
        />
        <label className="text-sm">Administrador</label>
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
};

export default UserForm;
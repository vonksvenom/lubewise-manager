import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { companyService, locationService } from "@/services/dataService";

const UserForm = ({ onSubmit, selectedUser, onClose }) => {
  const { isAdmin, isPowerUser } = useAuth();
  const companies = companyService.getAll();
  const locations = locationService.getAll();

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
      
      {isAdmin && (
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Empresa
          </label>
          <Select name="companyId" defaultValue={selectedUser?.companyId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(isAdmin || isPowerUser) && (
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Local
          </label>
          <Select name="locationId" defaultValue={selectedUser?.locationId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um local" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userService } from "@/services/dataService";
import { toast } from "sonner";

const TecnicoForm = ({ open, onOpenChange, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    email: "",
    nivel: "junior",
    horasDisponiveis: "8",
    department: "Manutenção",
    role: "technician",
    locationId: "",
    companyId: "",
  });

  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    
    // Load locations and companies
    const storedLocations = JSON.parse(localStorage.getItem("locations") || "[]");
    const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
    setLocations(storedLocations);
    setCompanies(storedCompanies);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.locationId) {
        toast.error("Por favor, selecione um local");
        return;
      }

      if (initialData) {
        userService.update(initialData.id, formData);
        toast.success("Técnico atualizado com sucesso!");
      } else {
        userService.add({
          ...formData,
          password: "senha123", // Senha padrão inicial
        });
        toast.success("Técnico adicionado com sucesso!");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao salvar técnico");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Operacional" : "Novo Operacional"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Empresa</label>
            <Select
              value={formData.companyId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, companyId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa" />
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Local</label>
            <Select
              value={formData.locationId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, locationId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .filter(loc => !formData.companyId || loc.companyId === formData.companyId)
                  .map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nível</label>
            <Select
              value={formData.nivel}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, nivel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Júnior</SelectItem>
                <SelectItem value="pleno">Pleno</SelectItem>
                <SelectItem value="senior">Sênior</SelectItem>
                <SelectItem value="especialista">Especialista</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Horas Disponíveis por Dia
            </label>
            <Input
              type="number"
              min="1"
              max="24"
              value={formData.horasDisponiveis}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  horasDisponiveis: e.target.value,
                }))
              }
              required
            />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TecnicoForm;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";

const EquipamentoForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nome: "",
      modelo: "",
      status: "Operacional",
      ultimaManutencao: new Date().toISOString().split("T")[0],
      proximaManutencao: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="nome" className="text-sm font-medium">
          Nome do Equipamento
        </label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="modelo" className="text-sm font-medium">
          Modelo
        </label>
        <Input
          id="modelo"
          value={formData.modelo}
          onChange={(e) => handleChange("modelo", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Operacional">Operacional</SelectItem>
            <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="ultimaManutencao" className="text-sm font-medium">
          Última Manutenção
        </label>
        <Input
          id="ultimaManutencao"
          type="date"
          value={formData.ultimaManutencao}
          onChange={(e) => handleChange("ultimaManutencao", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="proximaManutencao" className="text-sm font-medium">
          Próxima Manutenção
        </label>
        <Input
          id="proximaManutencao"
          type="date"
          value={formData.proximaManutencao}
          onChange={(e) => handleChange("proximaManutencao", e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default EquipamentoForm;
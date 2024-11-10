import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VOLUMES_PADRAO = ["200L", "20L", "5L", "1L", "500ml"];

const LubrificanteForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nomeComercial: "",
      codigoLIS: "",
      fornecedor: "",
      viscosidade: "",
      volumePadrao: "200L",
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
        <label htmlFor="nomeComercial" className="text-sm font-medium">
          Nome Comercial
        </label>
        <Input
          id="nomeComercial"
          value={formData.nomeComercial}
          onChange={(e) => handleChange("nomeComercial", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="codigoLIS" className="text-sm font-medium">
            Código LIS
          </label>
          <Input
            id="codigoLIS"
            value={formData.codigoLIS}
            onChange={(e) => handleChange("codigoLIS", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="fornecedor" className="text-sm font-medium">
            Fornecedor
          </label>
          <Input
            id="fornecedor"
            value={formData.fornecedor}
            onChange={(e) => handleChange("fornecedor", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="viscosidade" className="text-sm font-medium">
            Viscosidade
          </label>
          <Input
            id="viscosidade"
            value={formData.viscosidade}
            onChange={(e) => handleChange("viscosidade", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="volumePadrao" className="text-sm font-medium">
            Volume Padrão
          </label>
          <Select
            value={formData.volumePadrao}
            onValueChange={(value) => handleChange("volumePadrao", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o volume" />
            </SelectTrigger>
            <SelectContent>
              {VOLUMES_PADRAO.map((volume) => (
                <SelectItem key={volume} value={volume}>
                  {volume}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

export default LubrificanteForm;
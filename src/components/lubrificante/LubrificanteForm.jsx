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
import { toast } from "sonner";

const VOLUMES_PADRAO = ["1000L", "200L", "20L", "5L", "1L", "500ml"];

const LubrificanteForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nomeComercial: "",
      codigoLIS: "",
      fornecedor: "",
      viscosidade: "",
      volumePadrao: "200L",
      type: "Óleo",
      fispq: null,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFISPQUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("fispq", {
          name: file.name,
          content: reader.result,
          uploadDate: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor, selecione um arquivo PDF válido");
    }
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

      <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Tipo
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Óleo">Óleo</SelectItem>
              <SelectItem value="Graxa">Graxa</SelectItem>
            </SelectContent>
          </Select>
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

      <div className="space-y-2">
        <label htmlFor="fispq" className="text-sm font-medium">
          FISPQ (PDF)
        </label>
        <Input
          id="fispq"
          type="file"
          accept=".pdf"
          onChange={handleFISPQUpload}
          className="cursor-pointer"
        />
        {formData.fispq && (
          <p className="text-sm text-muted-foreground">
            Arquivo atual: {formData.fispq.name}
          </p>
        )}
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

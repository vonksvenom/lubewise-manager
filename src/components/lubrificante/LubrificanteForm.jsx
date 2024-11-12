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

const OLEO_VOLUMES = ["1000L", "200L", "20L", "5L", "1L", "500mL", "Outros"];
const GRAXA_VOLUMES = ["180Kg", "20Kg", "2Kg", "1Kg", "500g", "400g", "Outros"];

const LubrificanteForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nomeComercial: "",
      codigoLIS: "",
      fornecedor: "",
      viscosidade: "",
      volumePadrao: "",
      type: "Óleo",
      customVolume: "",
      fispq: null,
    }
  );

  const [showCustomVolume, setShowCustomVolume] = useState(
    initialData?.volumePadrao === "Outros"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.volumePadrao === "Outros" && !formData.customVolume) {
      toast.error("Por favor, preencha o volume personalizado");
      return;
    }
    const dataToSave = {
      ...formData,
      volumePadrao: formData.volumePadrao === "Outros" 
        ? `${formData.customVolume}${formData.type === "Óleo" ? "L" : "g"}`
        : formData.volumePadrao
    };
    onSave(dataToSave);
  };

  const handleChange = (field, value) => {
    if (field === "volumePadrao") {
      setShowCustomVolume(value === "Outros");
      if (value !== "Outros") {
        setFormData(prev => ({ ...prev, customVolume: "" }));
      }
    }
    if (field === "type") {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        volumePadrao: "",
        customVolume: ""
      }));
      setShowCustomVolume(false);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const volumeOptions = formData.type === "Óleo" ? OLEO_VOLUMES : GRAXA_VOLUMES;

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
              {volumeOptions.map((volume) => (
                <SelectItem key={volume} value={volume}>
                  {volume}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showCustomVolume && (
        <div className="space-y-2">
          <label htmlFor="customVolume" className="text-sm font-medium">
            Volume Personalizado ({formData.type === "Óleo" ? "L" : "g"})
          </label>
          <Input
            id="customVolume"
            type="number"
            min="0"
            step="0.001"
            value={formData.customVolume}
            onChange={(e) => handleChange("customVolume", e.target.value)}
            required
            placeholder={`Digite o volume em ${formData.type === "Óleo" ? "litros" : "gramas"}`}
          />
        </div>
      )}

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
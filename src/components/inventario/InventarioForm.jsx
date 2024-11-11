import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lubrificanteService } from "@/services/lubrificanteService";
import { areaService } from "@/services/dataService";

const InventarioForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      type: "",
      quantity: "",
      unit: "",
      location: "",
      area: "",
      commercialName: "",
    }
  );
  const [lubrificantes, setLubrificantes] = useState([]);
  const areas = areaService.getAll();

  useEffect(() => {
    const loadLubrificantes = async () => {
      const data = await lubrificanteService.getAll();
      setLubrificantes(data);
    };
    loadLubrificantes();
  }, []);

  const handleChange = (field, value) => {
    if (field === "commercialName") {
      const selectedLub = lubrificantes.find(lub => lub.nomeComercial === value);
      if (selectedLub) {
        setFormData(prev => ({
          ...prev,
          commercialName: value,
          type: selectedLub.type,
          unit: selectedLub.type.toLowerCase().includes('óleo') ? 'L' : 'Kg',
          name: value
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Lubrificante</label>
        <Select
          value={formData.commercialName}
          onValueChange={(value) => handleChange("commercialName", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o lubrificante" />
          </SelectTrigger>
          <SelectContent>
            {lubrificantes.map((lub) => (
              <SelectItem key={lub.id} value={lub.nomeComercial}>
                {lub.nomeComercial}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Quantidade</label>
          <Input
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Unidade</label>
          <Input value={formData.unit} disabled />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Localização</label>
          <Input
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Área</label>
          <Select
            value={formData.area}
            onValueChange={(value) => handleChange("area", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.nome}>
                  {area.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default InventarioForm;
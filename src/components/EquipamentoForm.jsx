import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import EquipamentoBasicInfo from "./equipamento/EquipamentoBasicInfo";
import EquipamentoStatusSelect from "./equipamento/EquipamentoStatusSelect";
import EquipamentoSubequipamentos from "./equipamento/EquipamentoSubequipamentos";
import { userService, areaService } from "@/services/dataService";

const EquipamentoForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nome: "",
      modelo: "",
      tag: "",
      area: "",
      responsavel: "",
      descricao: "",
      status: "Operacional",
      fabricante: "",
      numeroSerie: "",
      dataFabricacao: "",
      subequipamentos: [],
      manual: null,
    }
  );

  const areas = areaService.getAll();
  const responsaveis = userService.getAll().filter(user => 
    user.role === "technician" || user.role === "supervisor"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    if (field === "area") {
      // When area changes, update the area for all subequipamentos recursively
      const updateAreaInHierarchy = (items) => {
        return items.map(item => ({
          ...item,
          area: value,
          sistemas: item.sistemas ? updateAreaInHierarchy(item.sistemas) : undefined,
          conjuntos: item.conjuntos ? updateAreaInHierarchy(item.conjuntos) : undefined,
          subconjuntos: item.subconjuntos ? updateAreaInHierarchy(item.subconjuntos) : undefined,
          componentes: item.componentes ? updateAreaInHierarchy(item.componentes) : undefined
        }));
      };

      setFormData(prev => ({
        ...prev,
        [field]: value,
        subequipamentos: updateAreaInHierarchy(prev.subequipamentos || [])
      }));

      toast.success("Área atualizada em toda a hierarquia do equipamento");
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleManualUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("manual", {
          name: file.name,
          content: reader.result,
          type: file.type,
        });
        toast.success("Manual anexado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubequipamentoAdd = (subequipamento) => {
    // Ensure new subequipamento inherits the area
    const newSubequipamento = {
      ...subequipamento,
      area: formData.area
    };
    
    setFormData((prev) => ({
      ...prev,
      subequipamentos: [...(prev.subequipamentos || []), newSubequipamento],
    }));
  };

  const handleSubequipamentoRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      subequipamentos: (prev.subequipamentos || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EquipamentoBasicInfo formData={formData} handleChange={handleChange} />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="area" className="text-sm font-medium">Área</label>
          <Select value={formData.area} onValueChange={(value) => handleChange("area", value)}>
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
        <div className="space-y-2">
          <label htmlFor="responsavel" className="text-sm font-medium">Responsável</label>
          <Select value={formData.responsavel} onValueChange={(value) => handleChange("responsavel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o responsável" />
            </SelectTrigger>
            <SelectContent>
              {responsaveis.map((resp) => (
                <SelectItem key={resp.id} value={resp.name}>
                  {resp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="modelo" className="text-sm font-medium">Modelo</label>
          <Input
            id="modelo"
            value={formData.modelo}
            onChange={(e) => handleChange("modelo", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="fabricante" className="text-sm font-medium">Fabricante</label>
          <Input
            id="fabricante"
            value={formData.fabricante}
            onChange={(e) => handleChange("fabricante", e.target.value)}
          />
        </div>
      </div>

      <EquipamentoStatusSelect 
        value={formData.status}
        onValueChange={(value) => handleChange("status", value)}
      />

      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="manual" className="text-sm font-medium">Manual do Equipamento</label>
        <Input
          id="manual"
          type="file"
          onChange={handleManualUpload}
          className="cursor-pointer"
        />
        {formData.manual && (
          <p className="text-sm text-muted-foreground">
            Arquivo atual: {formData.manual.name}
          </p>
        )}
      </div>

      <EquipamentoSubequipamentos
        subequipamentos={formData.subequipamentos || []}
        onAdd={handleSubequipamentoAdd}
        onRemove={handleSubequipamentoRemove}
      />

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default EquipamentoForm;
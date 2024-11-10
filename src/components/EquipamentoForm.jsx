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
import { Textarea } from "@/components/ui/textarea";

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
      potencia: "",
      tensao: "",
      corrente: "",
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
      <div className="grid grid-cols-2 gap-4">
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
          <label htmlFor="tag" className="text-sm font-medium">
            TAG
          </label>
          <Input
            id="tag"
            value={formData.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
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
          <label htmlFor="fabricante" className="text-sm font-medium">
            Fabricante
          </label>
          <Input
            id="fabricante"
            value={formData.fabricante}
            onChange={(e) => handleChange("fabricante", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="area" className="text-sm font-medium">
            Área
          </label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => handleChange("area", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="responsavel" className="text-sm font-medium">
            Responsável
          </label>
          <Input
            id="responsavel"
            value={formData.responsavel}
            onChange={(e) => handleChange("responsavel", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="numeroSerie" className="text-sm font-medium">
            Número de Série
          </label>
          <Input
            id="numeroSerie"
            value={formData.numeroSerie}
            onChange={(e) => handleChange("numeroSerie", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dataFabricacao" className="text-sm font-medium">
            Data de Fabricação
          </label>
          <Input
            id="dataFabricacao"
            type="date"
            value={formData.dataFabricacao}
            onChange={(e) => handleChange("dataFabricacao", e.target.value)}
          />
        </div>
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
        <label htmlFor="descricao" className="text-sm font-medium">
          Descrição
        </label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="potencia" className="text-sm font-medium">
            Potência
          </label>
          <Input
            id="potencia"
            value={formData.potencia}
            onChange={(e) => handleChange("potencia", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tensao" className="text-sm font-medium">
            Tensão
          </label>
          <Input
            id="tensao"
            value={formData.tensao}
            onChange={(e) => handleChange("tensao", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="corrente" className="text-sm font-medium">
            Corrente
          </label>
          <Input
            id="corrente"
            value={formData.corrente}
            onChange={(e) => handleChange("corrente", e.target.value)}
          />
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

export default EquipamentoForm;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";

const OrdemServicoForm = ({ initialData, onSave, equipamentos }) => {
  const [formData, setFormData] = useState(
    initialData || {
      titulo: "",
      descricao: "",
      equipamentoId: "",
      status: "Pendente",
      dataInicio: new Date(),
      dataFim: new Date(),
      prioridade: "Media",
      consumables: [
        { type: "Óleo", quantity: 0 },
        { type: "Graxa", quantity: 0 },
      ],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConsumableChange = (type, quantity) => {
    setFormData((prev) => ({
      ...prev,
      consumables: prev.consumables.map((c) =>
        c.type === type ? { ...c, quantity: Number(quantity) } : c
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="titulo" className="text-sm font-medium">
          Título
        </label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium">
          Descrição
        </label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="equipamento" className="text-sm font-medium">
          Equipamento
        </label>
        <Select
          value={formData.equipamentoId}
          onValueChange={(value) => handleChange("equipamentoId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o equipamento" />
          </SelectTrigger>
          <SelectContent>
            {equipamentos.map((equip) => (
              <SelectItem key={equip.id} value={equip.id.toString()}>
                {equip.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
            <SelectItem value="Cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Data de Início</label>
        <DatePicker
          date={formData.dataInicio}
          onDateChange={(date) => handleChange("dataInicio", date)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Data de Fim</label>
        <DatePicker
          date={formData.dataFim}
          onDateChange={(date) => handleChange("dataFim", date)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="prioridade" className="text-sm font-medium">
          Prioridade
        </label>
        <Select
          value={formData.prioridade}
          onValueChange={(value) => handleChange("prioridade", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Baixa">Baixa</SelectItem>
            <SelectItem value="Media">Média</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Urgente">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Consumíveis</h3>
        {formData.consumables.map((consumable) => (
          <div key={consumable.type} className="space-y-2">
            <label className="text-sm font-medium">{consumable.type}</label>
            <Input
              type="number"
              min="0"
              value={consumable.quantity}
              onChange={(e) =>
                handleConsumableChange(consumable.type, e.target.value)
              }
              placeholder={`Quantidade de ${consumable.type}`}
            />
          </div>
        ))}
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

export default OrdemServicoForm;
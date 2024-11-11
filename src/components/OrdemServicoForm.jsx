import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import OrdemServicoBasicInfo from "./ordem-servico/OrdemServicoBasicInfo";
import OrdemServicoSelects from "./ordem-servico/OrdemServicoSelects";
import { userService } from "@/services/dataService";

const OrdemServicoForm = ({ initialData, onSave, equipamentos = [] }) => {
  const [formData, setFormData] = useState(
    initialData || {
      titulo: "",
      descricao: "",
      equipamentoId: "",
      tecnicoId: "",
      status: "Pendente",
      dataInicio: new Date(),
      dataFim: new Date(),
      prioridade: "Media",
      tipo: "Preventiva",
      cip: "",
      consumables: [
        { type: "Óleo", quantity: 0 },
        { type: "Graxa", quantity: 0 },
      ],
    }
  );

  const tecnicos = userService.getAll().filter(user => user.role === "technician");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tecnicoId) {
      alert("Por favor, selecione um técnico responsável");
      return;
    }
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
      <OrdemServicoBasicInfo formData={formData} handleChange={handleChange} />
      
      <OrdemServicoSelects
        formData={formData}
        handleChange={handleChange}
        equipamentos={equipamentos}
        tecnicos={tecnicos}
      />

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

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Consumíveis</h3>
        {formData.consumables.map((consumable) => (
          <div key={consumable.type} className="space-y-2">
            <label className="text-sm font-medium">
              {consumable.type} ({consumable.type === "Óleo" ? "L" : "g"})
            </label>
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
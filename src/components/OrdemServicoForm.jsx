import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import OrdemServicoBasicInfo from "./ordem-servico/OrdemServicoBasicInfo";
import OrdemServicoSelects from "./ordem-servico/OrdemServicoSelects";
import { userService } from "@/services/dataService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMonths, addYears, addDays, format } from "date-fns";
import { RECURRENCE_OPTIONS } from "@/constants/recurrenceOptions";

const OrdemServicoForm = ({ initialData, onSave, equipamentos = [] }) => {
  const [formData, setFormData] = useState(
    initialData || {
      titulo: "",
      descricao: "",
      equipamentoId: "",
      tecnicoId: "",
      status: "Pendente",
      dataExecucao: null,
      recorrencia: "none",
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

  const getNextDate = useMemo(() => {
    if (!formData.dataExecucao || formData.recorrencia === "none") return null;

    const date = new Date(formData.dataExecucao);
    
    switch (formData.recorrencia) {
      case "daily":
        return addDays(date, 1);
      case "weekly":
        return addDays(date, 7);
      case "biweekly":
        return addDays(date, 14);
      case "monthly":
        return addMonths(date, 1);
      case "bimonthly":
        return addMonths(date, 2);
      case "quarterly":
        return addMonths(date, 3);
      case "fourmonths":
        return addMonths(date, 4);
      case "fivemonths":
        return addMonths(date, 5);
      case "sixmonths":
        return addMonths(date, 6);
      case "sevenmonths":
        return addMonths(date, 7);
      case "eightmonths":
        return addMonths(date, 8);
      case "ninemonths":
        return addMonths(date, 9);
      case "tenmonths":
        return addMonths(date, 10);
      case "elevenmonths":
        return addMonths(date, 11);
      case "yearly":
        return addYears(date, 1);
      default:
        return null;
    }
  }, [formData.dataExecucao, formData.recorrencia]);

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
        <label className="text-sm font-medium">Data de Execução</label>
        <DatePicker
          date={formData.dataExecucao}
          onDateChange={(date) => handleChange("dataExecucao", date)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Recorrência</label>
        <Select
          value={formData.recorrencia}
          onValueChange={(value) => handleChange("recorrencia", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a recorrência" />
          </SelectTrigger>
          <SelectContent>
            {RECURRENCE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {getNextDate && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Próxima data:</label>
          <p className="text-muted-foreground">
            {format(getNextDate, "dd/MM/yyyy")}
          </p>
        </div>
      )}

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
              placeholder={`Quantidade de ${consumable.type} em ${consumable.type === "Óleo" ? "litros" : "gramas"}`}
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

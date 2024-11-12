import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import OrdemServicoBasicInfo from "./ordem-servico/OrdemServicoBasicInfo";
import OrdemServicoSelects from "./ordem-servico/OrdemServicoSelects";
import ConsumablesSection from "./ordem-servico/ConsumablesSection";
import EquipmentLubricationInfo from "./ordem-servico/EquipmentLubricationInfo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMonths, addYears, addDays, format } from "date-fns";
import { RECURRENCE_OPTIONS } from "@/constants/recurrenceOptions";
import { equipamentoService } from "@/services/dataService";
import { cn } from "@/lib/utils";

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

  const selectedEquipment = equipamentoService.getById(formData.equipamentoId);

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
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Data de Execução</label>
        <DatePicker
          date={formData.dataExecucao}
          onDateChange={(date) => handleChange("dataExecucao", date)}
          className={cn(
            "w-full shadow-neo-sm",
            "hover:bg-accent/50 transition-colors",
            "[&_.rdp]:bg-background [&_.rdp]:border [&_.rdp]:rounded-md [&_.rdp]:shadow-neo",
            "[&_.rdp-button]:hover:bg-accent/50",
            "[&_.rdp-day_span]:text-sm",
            "[&_.rdp-day_span]:font-medium",
            "[&_.rdp-day_span]:text-foreground",
            "[&_.rdp-day.rdp-day_selected]:bg-primary",
            "[&_.rdp-day.rdp-day_selected]:text-primary-foreground",
            "[&_.rdp-button:hover:not(.rdp-day_selected)]:bg-accent/50",
            "[&_.rdp-nav_button]:hover:bg-accent/50",
            "[&_.rdp-caption_label]:font-medium",
            "[&_.rdp-dropdown_month]:bg-background",
            "[&_.rdp-dropdown_month]:border",
            "[&_.rdp-dropdown_month]:rounded-md",
            "[&_.rdp-dropdown_month]:shadow-neo-sm"
          )}
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

      {selectedEquipment && (
        <EquipmentLubricationInfo selectedEquipment={selectedEquipment} />
      )}

      <ConsumablesSection
        formData={formData}
        handleConsumableChange={handleConsumableChange}
      />

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
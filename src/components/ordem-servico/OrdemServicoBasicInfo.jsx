import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import DateChangeDialog from "./DateChangeDialog";

const OrdemServicoBasicInfo = ({ formData, handleChange, isPreventiveOrPredictive }) => {
  const [dateChangeDialogOpen, setDateChangeDialogOpen] = useState(false);

  const handleDateChange = ({ newDate, reason, updateRecurring }) => {
    handleChange("dataExecucao", newDate, {
      reason,
      updateRecurring,
      previousDate: formData.dataExecucao
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="titulo" className="text-sm font-medium">
          Título
        </label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          disabled={isPreventiveOrPredictive}
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
          disabled={isPreventiveOrPredictive}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Data de Execução</label>
        <div className="flex items-center gap-2">
          <Input
            value={formData.dataExecucao ? format(new Date(formData.dataExecucao), "dd/MM/yyyy") : ""}
            readOnly
            className="bg-muted"
          />
          {isPreventiveOrPredictive && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setDateChangeDialogOpen(true)}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <DateChangeDialog
        open={dateChangeDialogOpen}
        onOpenChange={setDateChangeDialogOpen}
        currentDate={formData.dataExecucao}
        onSave={handleDateChange}
        hasRecurrence={formData.recorrencia !== "none"}
      />
    </div>
  );
};

export default OrdemServicoBasicInfo;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { RECURRENCE_OPTIONS } from "@/constants/recurrenceOptions";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const MaintenancePlanForm = ({ plans, onPlanChange }) => {
  const addPlan = () => {
    onPlanChange([
      ...plans,
      {
        id: Date.now(),
        tipo: "Preventiva",
        titulo: "",
        descricao: "",
        dataInicio: new Date(),
        recorrencia: "monthly",
        prioridade: "Media",
      },
    ]);
  };

  const removePlan = (planId) => {
    onPlanChange(plans.filter((plan) => plan.id !== planId));
  };

  const updatePlan = (planId, field, value) => {
    onPlanChange(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Planos de Manutenção</h3>
        <Button onClick={addPlan} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Plano
        </Button>
      </div>

      {plans.map((plan) => (
        <div
          key={plan.id}
          className="p-4 border rounded-lg space-y-4 bg-gradient-to-br from-background to-muted/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select
                value={plan.tipo}
                onValueChange={(value) => updatePlan(plan.id, "tipo", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Manutenção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventiva">Preventiva</SelectItem>
                  <SelectItem value="Preditiva">Preditiva</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={plan.prioridade}
                onValueChange={(value) => updatePlan(plan.id, "prioridade", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Media">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePlan(plan.id)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Título do Plano"
              value={plan.titulo}
              onChange={(e) => updatePlan(plan.id, "titulo", e.target.value)}
            />
            <Textarea
              placeholder="Descrição detalhada do plano de manutenção"
              value={plan.descricao}
              onChange={(e) => updatePlan(plan.id, "descricao", e.target.value)}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data de Início</label>
                <DatePicker
                  date={plan.dataInicio}
                  onDateChange={(date) =>
                    updatePlan(plan.id, "dataInicio", date)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Recorrência</label>
                <Select
                  value={plan.recorrencia}
                  onValueChange={(value) =>
                    updatePlan(plan.id, "recorrencia", value)
                  }
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenancePlanForm;
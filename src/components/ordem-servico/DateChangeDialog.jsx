import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

const DateChangeDialog = ({ 
  open, 
  onOpenChange, 
  currentDate, 
  onSave, 
  hasRecurrence 
}) => {
  const [newDate, setNewDate] = useState(currentDate);
  const [reason, setReason] = useState("");
  const [showRecurrenceDialog, setShowRecurrenceDialog] = useState(false);

  const handleSave = (updateRecurring = false) => {
    if (!reason.trim()) {
      toast.error("Por favor, informe o motivo da alteração da data");
      return;
    }

    onSave({
      newDate,
      reason,
      updateRecurring
    });
    
    onOpenChange(false);
  };

  const handleInitialSave = () => {
    if (hasRecurrence) {
      setShowRecurrenceDialog(true);
    } else {
      handleSave(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Data de Execução</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nova Data</label>
            <DatePicker
              date={newDate}
              onDateChange={setNewDate}
              className={cn(
                "w-full",
                "[&_.rdp-button:hover:not(.rdp-day_selected)]:bg-primary/10",
                "[&_.rdp-day_selected]:bg-primary"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Motivo da Alteração</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Informe o motivo da alteração da data..."
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleInitialSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>

      {showRecurrenceDialog && (
        <Dialog open={showRecurrenceDialog} onOpenChange={setShowRecurrenceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Datas Recorrentes</DialogTitle>
            </DialogHeader>
            <p>
              Deseja atualizar as datas das próximas manutenções com base na nova data?
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => handleSave(false)}>
                Alterar Apenas Esta
              </Button>
              <Button onClick={() => handleSave(true)}>
                Atualizar Próximas
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default DateChangeDialog;
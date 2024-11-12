import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MaintenancePlanForm from "./MaintenancePlanForm";
import { Download, Upload } from "lucide-react";
import { downloadTemplate, handleExcelImport } from "@/utils/excelUtils";
import { toast } from "sonner";

const MaintenancePlanDialog = ({ plans, open, onOpenChange, onUpdate }) => {
  const templateData = [
    {
      tipo: "Preventiva",
      titulo: "Manutenção Exemplo",
      descricao: "Descrição da manutenção",
      dataInicio: "2024-03-20",
      recorrencia: "monthly",
      prioridade: "Media"
    }
  ];

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleExcelImport(file, (data) => {
        onUpdate(data);
        toast.success("Planos de manutenção importados com sucesso!");
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Planos de Manutenção</DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadTemplate(templateData, "template_manutencao.xlsx")}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Modelo
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Importar Dados
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] pr-4">
          <MaintenancePlanForm
            plans={plans}
            onPlanChange={onUpdate}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenancePlanDialog;
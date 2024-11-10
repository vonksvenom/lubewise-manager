import { Button } from "@/components/ui/button";
import { Plus, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EquipamentoForm from "@/components/EquipamentoForm";
import BulkImportDialog from "@/components/common/BulkImportDialog";

const EquipamentoHeader = ({ 
  title, 
  onExport, 
  dialogOpen, 
  setDialogOpen, 
  selectedEquipamento, 
  setSelectedEquipamento, 
  onSave 
}) => {
  const templateData = [
    {
      nome: "Exemplo Equipamento",
      modelo: "Modelo XYZ",
      tag: "TAG-0001",
      area: "Produção",
      responsavel: "João Silva",
      status: "Operacional",
      fabricante: "Fabricante ABC",
      numeroSerie: "NS123456",
    }
  ];

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={onExport}
        >
          <FileDown className="h-4 w-4" />
          Exportar
        </Button>
        <BulkImportDialog
          title="Importar Equipamentos"
          onImport={() => {}}
          templateData={templateData}
          templateFilename="template_equipamentos.xlsx"
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setSelectedEquipamento(null)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Equipamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEquipamento ? "Editar Equipamento" : "Novo Equipamento"}
              </DialogTitle>
            </DialogHeader>
            <EquipamentoForm
              initialData={selectedEquipamento}
              onSave={onSave}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EquipamentoHeader;
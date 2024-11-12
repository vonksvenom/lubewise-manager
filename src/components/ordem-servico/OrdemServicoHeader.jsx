import { Button } from "@/components/ui/button";
import { Plus, Scale } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrdemServicoForm from "@/components/OrdemServicoForm";
import BulkImportDialog from "@/components/common/BulkImportDialog";

export const OrdemServicoHeader = ({ 
  t, 
  setBalanceamentoOpen, 
  dialogOpen, 
  setDialogOpen, 
  selectedOrdem, 
  setSelectedOrdem, 
  handleSave,
  equipamentos 
}) => {
  const templateData = [
    {
      titulo: "Exemplo Ordem 1",
      descricao: "Descrição da ordem",
      tipo: "Preventiva",
      equipamentoId: "1",
      status: "Pendente",
      dataInicio: "2024-03-20",
      dataFim: "2024-03-21",
      prioridade: "Media"
    }
  ];

  const handleImport = (data) => {
    data.forEach(item => {
      ordemServicoService.add(item);
    });
    setOrdensServico(ordemServicoService.getAll());
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{t("workOrders")}</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setBalanceamentoOpen(true)}
          className="shadow-neo hover:shadow-neo-sm transition-shadow"
        >
          <Scale className="h-4 w-4 mr-2" />
          Balanceamento Automático
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90 shadow-neo hover:shadow-neo-sm transition-shadow"
              onClick={() => setSelectedOrdem(null)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Ordem de Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedOrdem
                  ? "Editar Ordem de Serviço"
                  : "Nova Ordem de Serviço"}
              </DialogTitle>
            </DialogHeader>
            <OrdemServicoForm
              initialData={selectedOrdem}
              onSave={handleSave}
              equipamentos={equipamentos}
            />
          </DialogContent>
        </Dialog>
        <BulkImportDialog
          title="Importar Ordens de Serviço"
          onImport={handleImport}
          templateData={templateData}
          templateFilename="template_ordens_servico.xlsx"
        />
      </div>
    </div>
  );
};
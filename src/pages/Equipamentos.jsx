import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, FileDown, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import EquipamentoForm from "@/components/EquipamentoForm";
import EquipamentoTable from "@/components/EquipamentoTable";
import { equipamentoService } from "@/services/dataService";
import BulkImportDialog from "@/components/common/BulkImportDialog";
import * as XLSX from 'xlsx';

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const loadEquipamentos = async () => {
      setIsLoading(true);
      try {
        const data = await equipamentoService.getAll();
        setEquipamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading equipamentos:', error);
        setEquipamentos([]);
        toast({
          title: "Erro ao carregar equipamentos",
          description: "Não foi possível carregar a lista de equipamentos.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEquipamentos();
  }, [toast]);

  const handleDelete = async (id) => {
    try {
      await equipamentoService.delete(id);
      const updatedEquipamentos = await equipamentoService.getAll();
      setEquipamentos(updatedEquipamentos);
      toast({
        title: "Equipamento excluído",
        description: "O equipamento foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting equipamento:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o equipamento.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedEquipamento) {
        await equipamentoService.update(selectedEquipamento.id, data);
        toast({
          title: "Equipamento atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        await equipamentoService.add(data);
        toast({
          title: "Equipamento adicionado",
          description: "O novo equipamento foi cadastrado com sucesso.",
        });
      }
      const updatedEquipamentos = await equipamentoService.getAll();
      setEquipamentos(updatedEquipamentos);
      setSelectedEquipamento(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving equipamento:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const filteredEquipamentos = equipamentos.filter(
    (eq) =>
      eq.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(equipamentos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Equipamentos");
    XLSX.writeFile(wb, "equipamentos.xlsx");
    toast({
      title: "Exportação concluída",
      description: "Os dados foram exportados com sucesso.",
    });
  };

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

  const handleImport = (data) => {
    data.forEach(item => {
      equipamentoService.add(item);
    });
    setEquipamentos(equipamentoService.getAll());
    toast({
      title: "Importação concluída",
      description: `${data.length} equipamentos foram importados com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("equipment")}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
          >
            <FileDown className="h-4 w-4" />
            Exportar
          </Button>
          <BulkImportDialog
            title="Importar Equipamentos"
            onImport={handleImport}
            templateData={templateData}
            templateFilename="template_equipamentos.xlsx"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                onSave={handleSave}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <EquipamentoTable
          equipamentos={filteredEquipamentos}
          onEdit={setSelectedEquipamento}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Equipamentos;

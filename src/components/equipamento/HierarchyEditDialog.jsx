import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import HierarchyItem from "./HierarchyItem";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";
import { downloadTemplate, handleExcelImport } from "@/utils/excelUtils";

const HierarchyEditDialog = ({ equipamento, open, onOpenChange, onUpdate }) => {
  const [hierarchyData, setHierarchyData] = useState(equipamento);

  const handleUpdate = (updatedData) => {
    setHierarchyData(updatedData);
  };

  const handleSave = () => {
    onUpdate(hierarchyData);
    toast.success("Hierarquia salva com sucesso!");
    onOpenChange(false);
  };

  const templateData = [
    {
      nivel: "Sistema",
      nome: "Sistema Exemplo",
      tag: "SIS-001",
      descricao: "Descrição do sistema"
    },
    {
      nivel: "Conjunto",
      nome: "Conjunto Exemplo",
      tag: "CONJ-001",
      descricao: "Descrição do conjunto"
    }
  ];

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleExcelImport(file, (data) => {
        // Process imported data and update hierarchy
        const processedData = {
          ...hierarchyData,
          sistemas: data.filter(item => item.nivel === "Sistema"),
          conjuntos: data.filter(item => item.nivel === "Conjunto"),
          subconjuntos: data.filter(item => item.nivel === "Subconjunto"),
          componentes: data.filter(item => item.nivel === "Componente")
        };
        setHierarchyData(processedData);
        toast.success("Dados importados com sucesso!");
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Editar Hierarquia: {equipamento.nome}</DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadTemplate(templateData, "template_hierarquia.xlsx")}
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
        <ScrollArea className="h-[60vh] w-full pr-4">
          <HierarchyItem
            item={hierarchyData}
            onUpdate={handleUpdate}
            onDelete={() => {}}
          />
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Hierarquia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HierarchyEditDialog;
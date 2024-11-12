import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { equipamentoService } from "@/services/dataService";
import { fileStorageService } from "@/services/fileStorageService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const BulkImportDialog = ({ 
  title, 
  onImport, 
  templateData,
  templateFilename = "template.xlsx",
  onExport 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        onImport(data);
        setIsOpen(false);
        toast({
          title: "Importação concluída",
          description: `${data.length} registros foram importados com sucesso.`,
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Ocorreu um erro ao processar o arquivo. Verifique se está no formato correto.",
          variant: "destructive",
        });
      }
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleImagesZipUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      const equipamentos = equipamentoService.getAll();
      let successCount = 0;
      let errorCount = 0;

      for (const [filename, zipEntry] of Object.entries(contents.files)) {
        if (zipEntry.dir) continue;

        const tag = filename.split('.')[0].toUpperCase();
        const equipamento = equipamentos.find(e => e.tag === tag);

        if (equipamento) {
          try {
            const imageBlob = await zipEntry.async("blob");
            const imageFile = new File([imageBlob], filename, { type: "image/jpeg" });
            await fileStorageService.saveFile(imageFile, 'image');
            
            successCount++;
          } catch (error) {
            console.error(`Erro ao processar imagem ${filename}:`, error);
            errorCount++;
          }
        } else {
          errorCount++;
          console.warn(`TAG não encontrado para imagem: ${filename}`);
        }
      }

      toast({
        title: "Importação de imagens concluída",
        description: `${successCount} imagens importadas com sucesso. ${errorCount} erros encontrados.`,
        variant: successCount > 0 ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Ocorreu um erro ao processar o arquivo ZIP.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const data = {
          equipamentos: XLSX.utils.sheet_to_json(workbook.Sheets["Equipamentos"] || workbook.Sheets[workbook.SheetNames[0]]),
          hierarquia: XLSX.utils.sheet_to_json(workbook.Sheets["Hierarquia"] || []),
          planos: XLSX.utils.sheet_to_json(workbook.Sheets["Planos"] || [])
        };

        onImport(data);
        setIsOpen(false);
        toast({
          title: "Importação completa concluída",
          description: "Dados importados com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Ocorreu um erro ao processar o arquivo. Verifique se está no formato correto.",
          variant: "destructive",
        });
      }
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const downloadTemplate = (type) => {
    const templates = {
      basic: [templateData],
      complete: {
        Equipamentos: [
          {
            nome: "Exemplo Equipamento",
            tag: "TAG-001",
            area: "Produção",
            status: "Operacional"
          }
        ],
        Hierarquia: [
          {
            tagEquipamento: "TAG-001",
            tipo: "Sistema",
            nome: "Sistema Exemplo",
            tag: "SIS-001"
          }
        ],
        Planos: [
          {
            tagEquipamento: "TAG-001",
            titulo: "Plano Exemplo",
            tipo: "Preventiva",
            frequencia: "Mensal"
          }
        ]
      }
    };

    const wb = XLSX.utils.book_new();
    
    if (type === 'complete') {
      Object.entries(templates.complete).forEach(([sheetName, data]) => {
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });
      XLSX.writeFile(wb, "template_completo.xlsx");
    } else {
      const ws = XLSX.utils.json_to_sheet(templates.basic);
      XLSX.utils.book_append_sheet(wb, ws, "Template");
      XLSX.writeFile(wb, templateFilename);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="complete">Importação Completa</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <h4 className="font-medium">Importar Dados Básicos</h4>
                  <p className="text-sm text-muted-foreground">
                    Importe informações básicas dos equipamentos como nome, TAG e área.
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={() => downloadTemplate('basic')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Modelo
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Importar Imagens em Lote</h4>
                <p className="text-sm text-muted-foreground">
                  Envie um arquivo ZIP contendo as imagens nomeadas com o TAG do equipamento (ex: TAG-001.jpg).
                </p>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleImagesZipUpload}
                  className="w-full"
                />
              </div>
            </TabsContent>

            <TabsContent value="complete" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <h4 className="font-medium">Importação Completa</h4>
                  <p className="text-sm text-muted-foreground">
                    Importe todos os dados dos equipamentos, incluindo hierarquia e planos de manutenção.
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleCompleteImport}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={() => downloadTemplate('complete')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Modelo
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        className="gap-2"
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
        Exportar
      </Button>
    </div>
  );
};

export default BulkImportDialog;
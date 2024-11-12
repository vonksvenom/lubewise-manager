import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { equipamentoService } from "@/services/dataService";
import { fileStorageService } from "@/services/fileStorageService";

const BulkImportDialog = ({ 
  title, 
  onImport, 
  templateData,
  templateFilename = "template.xlsx" 
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

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, templateFilename);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Importar Planilha Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Importar Imagens em Lote (ZIP)</label>
              <p className="text-sm text-muted-foreground">
                As imagens dentro do ZIP devem ser nomeadas com o TAG do equipamento (ex: TAG-001.jpg).
                O sistema vinculará automaticamente cada imagem ao equipamento correspondente.
              </p>
              <input
                type="file"
                accept=".zip"
                onChange={handleImagesZipUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>

            <Button onClick={downloadTemplate} variant="outline">
              Baixar Padrão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkImportDialog;
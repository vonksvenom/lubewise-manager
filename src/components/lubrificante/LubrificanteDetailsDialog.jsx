import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const LubrificanteDetailsDialog = ({ isOpen, onOpenChange, lubrificante }) => {
  const handleDownloadFISPQ = () => {
    if (lubrificante?.fispq) {
      const link = document.createElement("a");
      link.href = lubrificante.fispq.content;
      link.download = lubrificante.fispq.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Lubrificante</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Nome Comercial</h4>
              <p className="text-muted-foreground">{lubrificante?.nomeComercial}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Código LIS</h4>
              <p className="text-muted-foreground">{lubrificante?.codigoLIS}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Fornecedor</h4>
              <p className="text-muted-foreground">{lubrificante?.fornecedor}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tipo</h4>
              <p className="text-muted-foreground">{lubrificante?.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Viscosidade</h4>
              <p className="text-muted-foreground">{lubrificante?.viscosidade}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Volume Padrão</h4>
              <p className="text-muted-foreground">{lubrificante?.volumePadrao}</p>
            </div>
          </div>

          {lubrificante?.fispq && (
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleDownloadFISPQ}
                className="w-full"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Baixar FISPQ
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LubrificanteDetailsDialog;
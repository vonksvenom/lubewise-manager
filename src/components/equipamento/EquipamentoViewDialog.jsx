import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDown, History } from "lucide-react";
import QRCodeDisplay from "../common/QRCodeDisplay";
import { format } from "date-fns";
import { useState } from "react";
import EquipamentoServiceHistory from "./EquipamentoServiceHistory";

const EquipamentoViewDialog = ({ equipamento, open, onOpenChange }) => {
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  if (!equipamento) return null;

  const handleDownloadManual = () => {
    if (equipamento.manual) {
      const link = document.createElement('a');
      link.href = equipamento.manual.content;
      link.download = equipamento.manual.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{equipamento.nome}</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setHistoryDialogOpen(true)}
              >
                <History className="h-4 w-4" />
                Histórico de Manutenções
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6">
            {equipamento.imagem && (
              <img
                src={equipamento.imagem}
                alt={equipamento.nome}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div className="space-y-2">
              <h3 className="font-semibold">Informações Básicas</h3>
              <p><span className="font-medium">TAG:</span> {equipamento.tag}</p>
              <p><span className="font-medium">Status:</span> {equipamento.status}</p>
              <p><span className="font-medium">Área:</span> {equipamento.area}</p>
              <p><span className="font-medium">Responsável:</span> {equipamento.responsavel}</p>
              <p><span className="font-medium">Modelo:</span> {equipamento.modelo}</p>
              <p><span className="font-medium">Fabricante:</span> {equipamento.fabricante}</p>
              <p><span className="font-medium">Número de Série:</span> {equipamento.numeroSerie}</p>
              {equipamento.dataFabricacao && (
                <p><span className="font-medium">Data de Fabricação:</span> {format(new Date(equipamento.dataFabricacao), 'dd/MM/yyyy')}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <QRCodeDisplay data={equipamento} showDownload={true} />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Manutenção</h3>
              <p><span className="font-medium">Última Manutenção:</span> {equipamento.ultimaManutencao || 'Não registrada'}</p>
              <p><span className="font-medium">Próxima Manutenção:</span> {equipamento.proximaManutencao || 'Não agendada'}</p>
            </div>

            {equipamento.descricao && (
              <div className="space-y-2">
                <h3 className="font-semibold">Descrição</h3>
                <p className="text-sm text-gray-600">{equipamento.descricao}</p>
              </div>
            )}

            {equipamento.manual && (
              <div className="space-y-2">
                <h3 className="font-semibold">Manual do Equipamento</h3>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={handleDownloadManual}
                >
                  <FileDown className="h-4 w-4" />
                  Baixar Manual ({equipamento.manual.name})
                </Button>
              </div>
            )}
          </div>
          
          {equipamento.subequipamentos?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Subequipamentos</h3>
              <div className="space-y-3">
                {equipamento.subequipamentos.map((sub, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{sub.nome}</p>
                        <p className="text-sm text-gray-600">TAG: {sub.tag}</p>
                        {sub.tipo && <p className="text-sm text-gray-600">Tipo: {sub.tipo}</p>}
                      </div>
                      <div className="flex justify-end">
                        <QRCodeDisplay data={sub} showDownload={true} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <EquipamentoServiceHistory
        equipamentoId={equipamento.id}
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
      />
    </>
  );
};

export default EquipamentoViewDialog;

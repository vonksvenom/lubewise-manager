import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDown, History, Network } from "lucide-react";
import QRCodeDisplay from "../common/QRCodeDisplay";
import { format } from "date-fns";
import { useState } from "react";
import EquipamentoServiceHistory from "./EquipamentoServiceHistory";
import EquipamentoHierarchyDialog from "./EquipamentoHierarchyDialog";

const EquipamentoViewDialog = ({ equipamento, open, onOpenChange }) => {
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [hierarchyDialogOpen, setHierarchyDialogOpen] = useState(false);

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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center gap-2">
              <span>{equipamento.nome}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setHierarchyDialogOpen(true)}
                >
                  <Network className="h-4 w-4" />
                  Ver Hierarquia
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setHistoryDialogOpen(true)}
                >
                  <History className="h-4 w-4" />
                  Histórico de Manutenções
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {equipamento.imagem && (
                <img
                  src={equipamento.imagem}
                  alt={equipamento.nome}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="space-y-2">
                <h3 className="font-semibold">Informações Básicas</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
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

              {equipamento.descricao && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Descrição</h3>
                  <p className="text-sm text-gray-600">{equipamento.descricao}</p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-semibold">Manutenção</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-medium">Última Manutenção:</span> {equipamento.ultimaManutencao || 'Não registrada'}</p>
                  <p><span className="font-medium">Próxima Manutenção:</span> {equipamento.proximaManutencao || 'Não agendada'}</p>
                </div>
              </div>

              {equipamento.manual && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={handleDownloadManual}
                >
                  <FileDown className="h-4 w-4" />
                  Baixar Manual ({equipamento.manual.name})
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <QRCodeDisplay data={equipamento} showDownload={true} />
              
              {equipamento.lubrificante && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Informações de Lubrificação</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Lubrificante:</span> {equipamento.lubrificante.descricaoComercial}</p>
                    <p><span className="font-medium">Recorrência:</span> {equipamento.lubrificante.recorrenciaRelubrificacao}</p>
                    <p><span className="font-medium">Quantidade:</span> {equipamento.lubrificante.quantidadeRelubrificacao}</p>
                    <p><span className="font-medium">Ponto de Lubrificação:</span> {equipamento.lubrificante.pontoLubrificacao}</p>
                    <p><span className="font-medium">Tipo:</span> {equipamento.lubrificante.tipo}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {equipamento.subequipamentos?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-3">Subequipamentos</h3>
              <div className="grid grid-cols-2 gap-4">
                {equipamento.subequipamentos.map((sub, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-medium">{sub.nome}</p>
                    <p className="text-sm text-gray-600">TAG: {sub.tag}</p>
                    {sub.tipo && <p className="text-sm text-gray-600">Tipo: {sub.tipo}</p>}
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

      <EquipamentoHierarchyDialog
        equipamento={equipamento}
        open={hierarchyDialogOpen}
        onOpenChange={setHierarchyDialogOpen}
      />
    </>
  );
};

export default EquipamentoViewDialog;
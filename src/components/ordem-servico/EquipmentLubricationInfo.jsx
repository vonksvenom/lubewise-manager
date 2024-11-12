import { Card } from "@/components/ui/card";
import QRCodeDisplay from "../common/QRCodeDisplay";
import { lubrificanteService } from "@/services/lubrificanteService";
import { useQuery } from "@tanstack/react-query";

const EquipmentLubricationInfo = ({ selectedEquipment }) => {
  const { data: lubrificantes = [] } = useQuery({
    queryKey: ['lubrificantes'],
    queryFn: lubrificanteService.getAll,
  });

  if (!selectedEquipment?.lubrificante) return null;

  const matchingLubrificante = lubrificantes.find(
    (lub) => lub.codigoLIS === selectedEquipment.lubrificante.codigoLIS
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Informações de Lubrificação</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Lubrificante: </span>
              {selectedEquipment.lubrificante.descricaoComercial}
            </p>
            <p>
              <span className="font-medium">Código LIS: </span>
              {selectedEquipment.lubrificante.codigoLIS}
            </p>
            <p>
              <span className="font-medium">Tipo: </span>
              {selectedEquipment.lubrificante.tipo}
            </p>
            <p>
              <span className="font-medium">Quantidade para Relubrificação: </span>
              {selectedEquipment.lubrificante.quantidadeRelubrificacao}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-start">
          <QRCodeDisplay data={selectedEquipment} />
        </div>
      </div>
    </Card>
  );
};

export default EquipmentLubricationInfo;
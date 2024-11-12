import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const OrdemServicoBasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="titulo" className="text-sm font-medium">
          Título
        </label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          placeholder="Digite o título da ordem de serviço"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium">
          Descrição
        </label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          placeholder="Digite a descrição da ordem de serviço"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="dataLocked"
          checked={formData.dataLocked}
          onCheckedChange={(checked) => handleChange("dataLocked", checked)}
        />
        <Label htmlFor="dataLocked">
          Bloquear alteração de data no balanceamento automático
        </Label>
      </div>
    </div>
  );
};

export default OrdemServicoBasicInfo;
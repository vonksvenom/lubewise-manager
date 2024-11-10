import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CIPField from "./CIPField";

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
          required
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
          required
        />
      </div>

      <CIPField
        value={formData.cip}
        onChange={(e) => handleChange("cip", e.target.value)}
      />
    </div>
  );
};

export default OrdemServicoBasicInfo;
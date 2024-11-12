import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EquipamentoDetails = ({ formData, handleChange, areas, responsaveis }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="area" className="text-sm font-medium">Área</label>
          <Select value={formData.area} onValueChange={(value) => handleChange("area", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.nome}>
                  {area.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="responsavel" className="text-sm font-medium">Responsável</label>
          <Select value={formData.responsavel} onValueChange={(value) => handleChange("responsavel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o responsável" />
            </SelectTrigger>
            <SelectContent>
              {responsaveis.map((resp) => (
                <SelectItem key={resp.id} value={resp.name}>
                  {resp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="modelo" className="text-sm font-medium">Modelo</label>
          <Input
            id="modelo"
            value={formData.modelo}
            onChange={(e) => handleChange("modelo", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="fabricante" className="text-sm font-medium">Fabricante</label>
          <Input
            id="fabricante"
            value={formData.fabricante}
            onChange={(e) => handleChange("fabricante", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          rows={3}
        />
      </div>
    </>
  );
};

export default EquipamentoDetails;
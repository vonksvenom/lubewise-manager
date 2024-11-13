import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const OrdemServicoBasicInfo = ({ formData, handleChange, isEditing = true }) => {
  const tipos = ["Preventiva", "Preditiva", "Corretiva", "Proativa"];
  const prioridades = ["Baixa", "Media", "Alta", "Urgente"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Select
            value={formData.tipo}
            onValueChange={(value) => handleChange("tipo", value)}
            disabled={!isEditing || formData.tipo === "Preventiva" || formData.tipo === "Preditiva"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {tipos.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prioridade">Prioridade</Label>
          <Select
            value={formData.prioridade}
            onValueChange={(value) => handleChange("prioridade", value)}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              {prioridades.map((prioridade) => (
                <SelectItem key={prioridade} value={prioridade}>
                  {prioridade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default OrdemServicoBasicInfo;
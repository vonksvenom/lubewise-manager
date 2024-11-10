import { Input } from "@/components/ui/input";

const EquipamentoBasicInfo = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <label htmlFor="nome" className="text-sm font-medium">Nome do Equipamento</label>
      <Input
        id="nome"
        value={formData.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
        required
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="tag" className="text-sm font-medium">TAG</label>
      <Input
        id="tag"
        value={formData.tag}
        onChange={(e) => handleChange("tag", e.target.value)}
        required
      />
    </div>
  </div>
);

export default EquipamentoBasicInfo;
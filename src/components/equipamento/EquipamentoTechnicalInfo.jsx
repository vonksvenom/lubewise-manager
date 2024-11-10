import { Input } from "@/components/ui/input";

const EquipamentoTechnicalInfo = ({ formData, handleChange }) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="space-y-2">
      <label htmlFor="potencia" className="text-sm font-medium">Potência</label>
      <Input
        id="potencia"
        value={formData.potencia}
        onChange={(e) => handleChange("potencia", e.target.value)}
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="tensao" className="text-sm font-medium">Tensão</label>
      <Input
        id="tensao"
        value={formData.tensao}
        onChange={(e) => handleChange("tensao", e.target.value)}
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="corrente" className="text-sm font-medium">Corrente</label>
      <Input
        id="corrente"
        value={formData.corrente}
        onChange={(e) => handleChange("corrente", e.target.value)}
      />
    </div>
  </div>
);

export default EquipamentoTechnicalInfo;
import { Input } from "@/components/ui/input";

const EquipamentoBasicInfo = ({ formData, handleChange }) => (
  <div className="space-y-4">
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
    <div className="space-y-2">
      <label htmlFor="imagem" className="text-sm font-medium">URL da Imagem</label>
      <Input
        id="imagem"
        value={formData.imagem}
        onChange={(e) => handleChange("imagem", e.target.value)}
        placeholder="https://exemplo.com/imagem.jpg"
      />
      {formData.imagem && (
        <img 
          src={formData.imagem} 
          alt={formData.nome}
          className="mt-2 w-full max-w-[200px] h-auto rounded-md border"
        />
      )}
    </div>
  </div>
);

export default EquipamentoBasicInfo;
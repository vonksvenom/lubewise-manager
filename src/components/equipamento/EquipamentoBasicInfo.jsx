import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const EquipamentoBasicInfo = ({ formData, handleChange }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("imagem", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="critico"
          checked={formData.critico}
          onCheckedChange={(checked) => handleChange("critico", checked)}
        />
        <label
          htmlFor="critico"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Equipamento Crítico
        </label>
      </div>

      <div className="space-y-2">
        <label htmlFor="imagem" className="text-sm font-medium">Imagem do Equipamento</label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="cursor-pointer"
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
};

export default EquipamentoBasicInfo;
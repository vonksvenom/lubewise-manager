import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AreaLocationMap from "./AreaLocationMap";

const AreaForm = ({ 
  selectedArea, 
  isViewMode, 
  onSubmit 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      responsavel: formData.get("responsavel"),
      location: formData.get("location") ? JSON.parse(formData.get("location")) : null,
      mapImage: formData.get("mapImage")
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="nome" className="text-sm font-medium">
          Nome da Área
        </label>
        <Input
          id="nome"
          name="nome"
          defaultValue={selectedArea?.nome}
          required
          readOnly={isViewMode}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="descricao" className="text-sm font-medium">
          Descrição
        </label>
        <Input
          id="descricao"
          name="descricao"
          defaultValue={selectedArea?.descricao}
          required
          readOnly={isViewMode}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="responsavel" className="text-sm font-medium">
          Responsável
        </label>
        <Input
          id="responsavel"
          name="responsavel"
          defaultValue={selectedArea?.responsavel}
          required
          readOnly={isViewMode}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Localização
        </label>
        <input 
          type="hidden" 
          name="location" 
          value={selectedArea?.location ? JSON.stringify(selectedArea.location) : ""}
        />
        <input 
          type="hidden" 
          name="mapImage" 
          value={selectedArea?.mapImage || ""}
        />
        <AreaLocationMap
          location={selectedArea?.location}
          mapImage={selectedArea?.mapImage}
          onLocationChange={(location) => {
            const input = document.querySelector('input[name="location"]');
            input.value = JSON.stringify(location);
          }}
          onMapImageChange={(imageData) => {
            const input = document.querySelector('input[name="mapImage"]');
            input.value = imageData;
          }}
          readOnly={isViewMode}
        />
      </div>

      {!isViewMode && <Button type="submit">Salvar</Button>}
    </form>
  );
};

export default AreaForm;
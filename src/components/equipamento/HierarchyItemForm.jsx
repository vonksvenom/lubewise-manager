import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HierarchyItemForm = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(data);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-2 border p-4 rounded-lg">
      <Input
        placeholder="Nome"
        value={formData.nome}
        onChange={(e) => handleChange('nome', e.target.value)}
      />
      <Input
        placeholder="TAG"
        value={formData.tag}
        onChange={(e) => handleChange('tag', e.target.value)}
      />
      <Textarea
        placeholder="Descrição detalhada"
        value={formData.descricao || ""}
        onChange={(e) => handleChange('descricao', e.target.value)}
      />
      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)}>Salvar</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default HierarchyItemForm;
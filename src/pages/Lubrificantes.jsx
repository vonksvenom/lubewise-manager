import { useState } from "react";
import { Card } from "@/components/ui/card";
import LubrificanteForm from "@/components/lubrificante/LubrificanteForm";
import LubrificanteTable from "@/components/lubrificante/LubrificanteTable";
import LubrificanteHeader from "@/components/lubrificante/LubrificanteHeader";
import { useToast } from "@/components/ui/use-toast";
import { lubrificanteService } from "@/services/lubrificanteService";

const Lubrificantes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLubrificante, setSelectedLubrificante] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async (data) => {
    try {
      if (selectedLubrificante) {
        await lubrificanteService.update(selectedLubrificante.id, data);
        toast({
          title: "Lubrificante atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        await lubrificanteService.add(data);
        toast({
          title: "Lubrificante adicionado",
          description: "O novo lubrificante foi cadastrado com sucesso.",
        });
      }
      setSelectedLubrificante(null);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <LubrificanteHeader
        title="Lubrificantes"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedLubrificante={selectedLubrificante}
        setSelectedLubrificante={setSelectedLubrificante}
        onSave={handleSave}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Buscar lubrificantes..."
            className="w-full px-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <LubrificanteTable
            searchTerm={searchTerm}
            onEdit={setSelectedLubrificante}
          />
        </div>
      </Card>
    </div>
  );
};

export default Lubrificantes;
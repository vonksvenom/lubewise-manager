import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { equipamentoService } from "@/services/dataService";
import { useToast } from "@/components/ui/use-toast";
import EquipamentoTable from "@/components/EquipamentoTable";
import EquipamentoHeader from "@/components/equipamento/EquipamentoHeader";
import EquipamentoSearch from "@/components/equipamento/EquipamentoSearch";
import * as XLSX from 'xlsx';

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const loadEquipamentos = async () => {
      setIsLoading(true);
      try {
        const data = await equipamentoService.getAll();
        setEquipamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading equipamentos:', error);
        setEquipamentos([]);
        toast({
          title: "Erro ao carregar equipamentos",
          description: "Não foi possível carregar a lista de equipamentos.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEquipamentos();
  }, [toast]);

  const handleDelete = async (id) => {
    try {
      await equipamentoService.delete(id);
      const updatedEquipamentos = await equipamentoService.getAll();
      setEquipamentos(updatedEquipamentos);
      toast({
        title: "Equipamento excluído",
        description: "O equipamento foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting equipamento:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o equipamento.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedEquipamento) {
        await equipamentoService.update(selectedEquipamento.id, data);
        toast({
          title: "Equipamento atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        await equipamentoService.add(data);
        toast({
          title: "Equipamento adicionado",
          description: "O novo equipamento foi cadastrado com sucesso.",
        });
      }
      const updatedEquipamentos = await equipamentoService.getAll();
      setEquipamentos(updatedEquipamentos);
      setSelectedEquipamento(null);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving equipamento:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setDialogOpen(true);
  };

  const filteredEquipamentos = equipamentos.filter(
    (eq) =>
      eq.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <EquipamentoHeader 
        title={t("equipment")}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedEquipamento={selectedEquipamento}
        setSelectedEquipamento={setSelectedEquipamento}
        onSave={handleSave}
      />

      <Card className="p-6">
        <EquipamentoSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <EquipamentoTable
          equipamentos={filteredEquipamentos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Equipamentos;

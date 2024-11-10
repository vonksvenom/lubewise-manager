import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import EquipamentoForm from "@/components/EquipamentoForm";
import EquipamentoTable from "@/components/EquipamentoTable";
import { equipamentoService } from "@/services/dataService";

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    setEquipamentos(equipamentoService.getAll());
  }, []);

  const handleDelete = (id) => {
    equipamentoService.delete(id);
    setEquipamentos(equipamentoService.getAll());
    toast({
      title: "Equipamento excluído",
      description: "O equipamento foi removido com sucesso.",
    });
  };

  const handleSave = (data) => {
    if (selectedEquipamento) {
      equipamentoService.update(selectedEquipamento.id, data);
      toast({
        title: "Equipamento atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      equipamentoService.add(data);
      toast({
        title: "Equipamento adicionado",
        description: "O novo equipamento foi cadastrado com sucesso.",
      });
    }
    setEquipamentos(equipamentoService.getAll());
    setSelectedEquipamento(null);
    setIsDialogOpen(false); // Fecha o modal após salvar
  };

  const filteredEquipamentos = equipamentos.filter(
    (eq) =>
      eq.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("equipment")}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setSelectedEquipamento(null)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Equipamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEquipamento ? "Editar Equipamento" : "Novo Equipamento"}
              </DialogTitle>
            </DialogHeader>
            <EquipamentoForm
              initialData={selectedEquipamento}
              onSave={handleSave}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <EquipamentoTable
          equipamentos={filteredEquipamentos}
          onEdit={setSelectedEquipamento}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
};

export default Equipamentos;
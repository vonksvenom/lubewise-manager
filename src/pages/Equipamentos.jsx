import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import EquipamentoForm from "@/components/EquipamentoForm";

const equipamentosMock = [
  {
    id: 1,
    nome: "Torno CNC",
    modelo: "TCN-2000",
    status: "Operacional",
    ultimaManutencao: "2024-03-15",
    proximaManutencao: "2024-04-15",
  },
  {
    id: 2,
    nome: "Fresadora",
    modelo: "FR-500",
    status: "Em Manutenção",
    ultimaManutencao: "2024-03-10",
    proximaManutencao: "2024-04-10",
  },
  {
    id: 3,
    nome: "Prensa Hidráulica",
    modelo: "PH-100",
    status: "Operacional",
    ultimaManutencao: "2024-03-05",
    proximaManutencao: "2024-04-05",
  },
];

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipamentos, setEquipamentos] = useState(equipamentosMock);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleDelete = (id) => {
    setEquipamentos(equipamentos.filter((eq) => eq.id !== id));
    toast({
      title: "Equipamento excluído",
      description: "O equipamento foi removido com sucesso.",
    });
  };

  const handleSave = (data) => {
    if (selectedEquipamento) {
      setEquipamentos(
        equipamentos.map((eq) =>
          eq.id === selectedEquipamento.id ? { ...eq, ...data } : eq
        )
      );
      toast({
        title: "Equipamento atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      setEquipamentos([
        ...equipamentos,
        { ...data, id: equipamentos.length + 1 },
      ]);
      toast({
        title: "Equipamento adicionado",
        description: "O novo equipamento foi cadastrado com sucesso.",
      });
    }
    setSelectedEquipamento(null);
  };

  const filteredEquipamentos = equipamentos.filter(
    (eq) =>
      eq.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('equipment')}</h1>
        <Dialog>
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Manutenção</TableHead>
                <TableHead>Próxima Manutenção</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipamentos.map((equip) => (
                <TableRow key={equip.id}>
                  <TableCell className="font-medium">{equip.nome}</TableCell>
                  <TableCell>{equip.modelo}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        equip.status === "Operacional"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {equip.status}
                    </span>
                  </TableCell>
                  <TableCell>{equip.ultimaManutencao}</TableCell>
                  <TableCell>{equip.proximaManutencao}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedEquipamento(equip)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Equipamento</DialogTitle>
                        </DialogHeader>
                        <EquipamentoForm
                          initialData={equip}
                          onSave={handleSave}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(equip.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Equipamentos;
import { useState } from "react";
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
import OrdemServicoForm from "@/components/OrdemServicoForm";
import OrdemServicoTable from "@/components/OrdemServicoTable";

// Mock data for demonstration
const ordensServicoMock = [
  {
    id: 1,
    titulo: "Manutenção Preventiva",
    descricao: "Realizar manutenção preventiva no equipamento",
    equipamentoId: "1",
    status: "Pendente",
    dataInicio: new Date(),
    dataFim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    prioridade: "Media",
  },
];

const equipamentosMock = [
  {
    id: 1,
    nome: "Torno CNC",
    modelo: "TCN-2000",
    status: "Operacional",
  },
];

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ordensServico, setOrdensServico] = useState(ordensServicoMock);
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleDelete = (id) => {
    setOrdensServico(ordensServico.filter((ordem) => ordem.id !== id));
    toast({
      title: "Ordem de serviço excluída",
      description: "A ordem de serviço foi removida com sucesso.",
    });
  };

  const handleSave = (data) => {
    if (selectedOrdem) {
      setOrdensServico(
        ordensServico.map((ordem) =>
          ordem.id === selectedOrdem.id ? { ...ordem, ...data } : ordem
        )
      );
      toast({
        title: "Ordem de serviço atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      setOrdensServico([...ordensServico, { ...data, id: Date.now() }]);
      toast({
        title: "Ordem de serviço criada",
        description: "A nova ordem de serviço foi cadastrada com sucesso.",
      });
    }
    setSelectedOrdem(null);
  };

  const filteredOrdensServico = ordensServico.filter(
    (ordem) =>
      ordem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("workOrders")}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setSelectedOrdem(null)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Ordem de Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedOrdem
                  ? "Editar Ordem de Serviço"
                  : "Nova Ordem de Serviço"}
              </DialogTitle>
            </DialogHeader>
            <OrdemServicoForm
              initialData={selectedOrdem}
              onSave={handleSave}
              equipamentos={equipamentosMock}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar ordens de serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <OrdemServicoTable
          ordensServico={filteredOrdensServico}
          onEdit={setSelectedOrdem}
          onDelete={handleDelete}
          equipamentos={equipamentosMock}
        />
      </Card>
    </div>
  );
};

export default OrdensServico;
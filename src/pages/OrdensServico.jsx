import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import OrdemServicoTable from "@/components/OrdemServicoTable";
import OrdemServicoFilters from "@/components/ordem-servico/OrdemServicoFilters";
import { ordemServicoService, equipamentoService, userService } from "@/services/dataService";
import { filterOrdens } from "@/components/ordem-servico/filterOrdens";
import { OrdemServicoHeader } from "@/components/ordem-servico/OrdemServicoHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const OrdensServico = () => {
  const queryClient = useQueryClient();
  const { data: ordensServico = [], isLoading } = useQuery({
    queryKey: ['ordensServico'],
    queryFn: () => ordemServicoService.getAll(),
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [balanceamentoOpen, setBalanceamentoOpen] = useState(false);
  const [filters, setFilters] = useState({
    tipo: "Todos",
    tecnicoId: "Todos",
    status: "Todos",
    prioridade: "Todos",
    equipamentoId: "Todos"
  });
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordensData, equipamentosData] = await Promise.all([
          ordemServicoService.getAll(),
          equipamentoService.getAll()
        ]);
        setEquipamentos(equipamentosData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Houve um problema ao carregar os dados. Usando dados locais.",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, [toast]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDelete = (id) => {
    ordemServicoService.delete(id);
    queryClient.invalidateQueries({ queryKey: ['ordensServico'] });
    toast({
      title: "Ordem de serviço excluída",
      description: "A ordem de serviço foi removida com sucesso.",
    });
  };

  const handleSave = (data) => {
    if (selectedOrdem) {
      ordemServicoService.update(selectedOrdem.id, data);
      queryClient.invalidateQueries({ queryKey: ['ordensServico'] });
      toast({
        title: "Ordem de serviço atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      ordemServicoService.add(data);
      queryClient.invalidateQueries({ queryKey: ['ordensServico'] });
      toast({
        title: "Ordem de serviço criada",
        description: "A nova ordem de serviço foi cadastrada com sucesso.",
      });
    }
    setSelectedOrdem(null);
    setDialogOpen(false);
  };

  const handleEdit = (ordem) => {
    setSelectedOrdem(ordem);
    setDialogOpen(true);
  };

  const filterOrdensWithSearch = (ordem) => {
    if (!searchTerm) return filterOrdens(ordem, filters);
    
    const searchTermLower = searchTerm.toLowerCase();
    const equipamento = equipamentos.find(e => e.id.toString() === ordem.equipamentoId);
    const tecnico = userService.getAll().find(u => u.id === ordem.tecnicoId);
    
    const searchableFields = [
      ordem.titulo,
      ordem.descricao,
      ordem.tipo,
      ordem.status,
      ordem.prioridade,
      equipamento?.nome,
      tecnico?.name,
      ordem.cip,
      ordem.recorrencia
    ].map(field => field?.toLowerCase() || '');

    return searchableFields.some(field => field.includes(searchTermLower)) && 
           filterOrdens(ordem, filters);
  };

  const filteredOrdensServico = ordensServico.filter(filterOrdensWithSearch);

  return (
    <div className="space-y-6">
      <OrdemServicoHeader 
        t={t}
        setBalanceamentoOpen={setBalanceamentoOpen}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedOrdem={selectedOrdem}
        setSelectedOrdem={setSelectedOrdem}
        handleSave={handleSave}
        equipamentos={equipamentos}
      />

      <Card className="p-6 shadow-neo bg-gradient-to-br from-muted to-accent/10">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar ordens de serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-neo-sm"
            />
          </div>

          <OrdemServicoFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            equipamentos={equipamentos}
          />

          <OrdemServicoTable
            ordensServico={filteredOrdensServico}
            onEdit={handleEdit}
            onDelete={handleDelete}
            equipamentos={equipamentos}
          />
        </div>
      </Card>
    </div>
  );
};

export default OrdensServico;

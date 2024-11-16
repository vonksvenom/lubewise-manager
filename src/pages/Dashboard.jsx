import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Clock, Users } from "lucide-react";
import { ordemServicoService, equipamentoService, inventarioService, userService } from "@/services/dataService";
import { InventoryChart } from "@/components/InventoryChart";
import { InventarioSummary } from "@/components/InventarioSummary";
import MaintenanceStats from "@/components/dashboard/MaintenanceStats";
import WorkloadStats from "@/components/dashboard/WorkloadStats";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TechniciansDialog from "@/components/dashboard/TechniciansDialog";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data: ordensServico, isLoading: ordensLoading } = useQuery({
    queryKey: ['ordensServico'],
    queryFn: () => ordemServicoService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    initialData: []
  });

  const { data: equipamentos, isLoading: equipamentosLoading } = useQuery({
    queryKey: ['equipamentos'],
    queryFn: () => equipamentoService.getAll(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 2,
    initialData: []
  });

  const { data: inventario, isLoading: inventarioLoading } = useQuery({
    queryKey: ['inventario'],
    queryFn: () => inventarioService.getAll(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 2,
    initialData: []
  });

  const tecnicos = userService.getAll().filter(user => user.role === "technician");
  const totalHorasDisponiveis = tecnicos.reduce((total, tecnico) => 
    total + Number(tecnico.horasDisponiveis || 0), 0
  );

  if (ordensLoading || equipamentosLoading || inventarioLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            Última atualização: {format(new Date(), "dd/MM/yyyy HH:mm")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Horas Disponíveis</p>
              <p className="text-2xl font-bold text-blue-500">{totalHorasDisponiveis}h/dia</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => setDialogOpen(true)}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Técnicos</p>
              <p className="text-2xl font-bold text-green-500">{tecnicos.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <MaintenanceStats ordensServico={ordensServico} />
      
      <WorkloadStats ordensServico={ordensServico} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <InventoryChart />
        <InventarioSummary />
      </div>

      <TechniciansDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Dashboard;
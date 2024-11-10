import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { ordemServicoService, equipamentoService, inventarioService } from "@/services/dataService";
import { InventoryChart } from "@/components/InventoryChart";
import { InventarioSummary } from "@/components/InventarioSummary";
import MaintenanceStats from "@/components/dashboard/MaintenanceStats";
import WorkloadStats from "@/components/dashboard/WorkloadStats";

const Dashboard = () => {
  const { t } = useTranslation();
  const ordensServico = ordemServicoService.getAll();
  const equipamentos = equipamentoService.getAll();
  const inventario = inventarioService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-catYellow">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-catYellow" />
          <span className="text-gray-400">
            Última atualização: {format(new Date(), "dd/MM/yyyy HH:mm")}
          </span>
        </div>
      </div>

      <MaintenanceStats ordensServico={ordensServico} />
      
      <WorkloadStats ordensServico={ordensServico} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <InventoryChart />
        <InventarioSummary />
      </div>
    </div>
  );
};

export default Dashboard;
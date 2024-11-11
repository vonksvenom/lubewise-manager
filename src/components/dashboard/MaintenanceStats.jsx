import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { format, isThisWeek, isAfter, isBefore, addWeeks, startOfWeek } from "date-fns";
import { useState } from "react";
import MaintenanceOrdersDialog from "./MaintenanceOrdersDialog";

const MaintenanceStats = ({ ordensServico, onEditOrder }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");

  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));

  const getMaintenanceStats = () => {
    const stats = {
      corretivas: { vencidas: [], essaSemana: [], proximaSemana: [], concluidasComAtraso: [] },
      preventivas: { vencidas: [], essaSemana: [], proximaSemana: [], concluidasComAtraso: [] },
      preditivas: { vencidas: [], essaSemana: [], proximaSemana: [], concluidasComAtraso: [] }
    };

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const categoria = ordem.tipo.toLowerCase() + 's';
      
      if (ordem.status === "Concluída" && ordem.dataConclusao && isBefore(dataFim, ordem.dataConclusao)) {
        stats[categoria].concluidasComAtraso.push(ordem);
      } else if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
        stats[categoria].vencidas.push(ordem);
      } else if (isThisWeek(dataFim)) {
        stats[categoria].essaSemana.push(ordem);
      } else if (isAfter(dataFim, nextWeekStart) && isBefore(dataFim, addWeeks(nextWeekStart, 1))) {
        stats[categoria].proximaSemana.push(ordem);
      }
    });

    return stats;
  };

  const stats = getMaintenanceStats();

  const handleClick = (orders, title) => {
    setSelectedOrders(orders);
    setDialogTitle(title);
    setDialogOpen(true);
  };

  const renderMaintenanceCard = (title, stats) => (
    <DashboardCard title={title}>
      <div className="space-y-4">
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-accent/10 p-2 rounded-lg transition-colors"
          onClick={() => handleClick(stats.vencidas, `${title} - Atrasadas`)}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <span>Atrasadas</span>
          </div>
          <span className="font-bold text-red-500">{stats.vencidas.length}</span>
        </div>
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-accent/10 p-2 rounded-lg transition-colors"
          onClick={() => handleClick(stats.concluidasComAtraso, `${title} - Concluídas com Atraso`)}
        >
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" />
            <span>Concluídas com Atraso</span>
          </div>
          <span className="font-bold text-orange-500">{stats.concluidasComAtraso.length}</span>
        </div>
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-accent/10 p-2 rounded-lg transition-colors"
          onClick={() => handleClick(stats.essaSemana, `${title} - Esta Semana`)}
        >
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-500" />
            <span>Esta Semana</span>
          </div>
          <span className="font-bold text-yellow-500">{stats.essaSemana.length}</span>
        </div>
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-accent/10 p-2 rounded-lg transition-colors"
          onClick={() => handleClick(stats.proximaSemana, `${title} - Próxima Semana`)}
        >
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-500" />
            <span>Próxima Semana</span>
          </div>
          <span className="font-bold text-blue-500">{stats.proximaSemana.length}</span>
        </div>
      </div>
    </DashboardCard>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderMaintenanceCard("Manutenções Corretivas", stats.corretivas)}
        {renderMaintenanceCard("Manutenções Preventivas", stats.preventivas)}
        {renderMaintenanceCard("Manutenções Preditivas", stats.preditivas)}
      </div>

      <MaintenanceOrdersDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        orders={selectedOrders}
        title={dialogTitle}
        onEdit={onEditOrder}
      />
    </>
  );
};

export default MaintenanceStats;
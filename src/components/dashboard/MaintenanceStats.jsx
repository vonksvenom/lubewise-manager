import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { format, isThisWeek, isAfter, isBefore, addWeeks, startOfWeek } from "date-fns";

const MaintenanceStats = ({ ordensServico }) => {
  const { t } = useTranslation();
  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));

  const getMaintenanceStats = () => {
    const stats = {
      corretivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0, concluidasComAtraso: 0 },
      preventivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0, concluidasComAtraso: 0 },
      preditivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0, concluidasComAtraso: 0 }
    };

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const categoria = ordem.tipo.toLowerCase() + 's';
      
      if (ordem.status === "Concluída" && ordem.dataConclusao && isBefore(dataFim, ordem.dataConclusao)) {
        stats[categoria].concluidasComAtraso++;
      } else if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
        stats[categoria].vencidas++;
      } else if (isThisWeek(dataFim)) {
        stats[categoria].essaSemana++;
      } else if (isAfter(dataFim, nextWeekStart) && isBefore(dataFim, addWeeks(nextWeekStart, 1))) {
        stats[categoria].proximaSemana++;
      }
    });

    return stats;
  };

  const stats = getMaintenanceStats();

  const renderMaintenanceCard = (title, stats) => (
    <DashboardCard title={title}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <span>Atrasadas</span>
          </div>
          <span className="font-bold text-red-500">{stats.vencidas}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" />
            <span>Concluídas com Atraso</span>
          </div>
          <span className="font-bold text-orange-500">{stats.concluidasComAtraso}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-500" />
            <span>Esta Semana</span>
          </div>
          <span className="font-bold text-yellow-500">{stats.essaSemana}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-500" />
            <span>Próxima Semana</span>
          </div>
          <span className="font-bold text-blue-500">{stats.proximaSemana}</span>
        </div>
      </div>
    </DashboardCard>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {renderMaintenanceCard("Manutenções Corretivas", stats.corretivas)}
      {renderMaintenanceCard("Manutenções Preventivas", stats.preventivas)}
      {renderMaintenanceCard("Manutenções Preditivas", stats.preditivas)}
    </div>
  );
};

export default MaintenanceStats;
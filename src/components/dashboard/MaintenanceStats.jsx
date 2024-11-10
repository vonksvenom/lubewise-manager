import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { format, isThisWeek, isAfter, isBefore, addWeeks, startOfWeek } from "date-fns";

const MaintenanceStats = ({ ordensServico = [] }) => {
  const { t } = useTranslation();
  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));

  const getMaintenanceStats = () => {
    const stats = {
      corretivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0 },
      preventivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0 },
      preditivas: { vencidas: 0, essaSemana: 0, proximaSemana: 0 }
    };

    if (!Array.isArray(ordensServico)) {
      console.warn('ordensServico is not an array:', ordensServico);
      return stats;
    }

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const categoria = ordem.tipo?.toLowerCase() + 's';
      
      if (!stats[categoria]) {
        console.warn('Invalid categoria:', categoria);
        return;
      }

      if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Manutenções Corretivas">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" />
              <span>Vencidas</span>
            </div>
            <span className="font-bold text-red-500">{stats.corretivas.vencidas}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-yellow-500" />
              <span>Esta Semana</span>
            </div>
            <span className="font-bold text-yellow-500">{stats.corretivas.essaSemana}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" />
              <span>Próxima Semana</span>
            </div>
            <span className="font-bold text-blue-500">{stats.corretivas.proximaSemana}</span>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Manutenções Preventivas">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" />
              <span>Vencidas</span>
            </div>
            <span className="font-bold text-red-500">{stats.preventivas.vencidas}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-yellow-500" />
              <span>Esta Semana</span>
            </div>
            <span className="font-bold text-yellow-500">{stats.preventivas.essaSemana}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" />
              <span>Próxima Semana</span>
            </div>
            <span className="font-bold text-blue-500">{stats.preventivas.proximaSemana}</span>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Manutenções Preditivas">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" />
              <span>Vencidas</span>
            </div>
            <span className="font-bold text-red-500">{stats.preditivas.vencidas}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-yellow-500" />
              <span>Esta Semana</span>
            </div>
            <span className="font-bold text-yellow-500">{stats.preditivas.essaSemana}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" />
              <span>Próxima Semana</span>
            </div>
            <span className="font-bold text-blue-500">{stats.preditivas.proximaSemana}</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default MaintenanceStats;
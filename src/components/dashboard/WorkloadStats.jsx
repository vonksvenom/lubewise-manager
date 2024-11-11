import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, Timer } from "lucide-react";
import { isAfter, isBefore, addWeeks, startOfWeek } from "date-fns";

const WorkloadStats = ({ ordensServico = [] }) => {
  const { t } = useTranslation();
  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));

  const calculateWorkload = () => {
    let horasVencidas = 0;
    let horasProximaSemana = 0;

    if (!Array.isArray(ordensServico)) return { horasVencidas: 0, horasProximaSemana: 0 };

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const horasEstimadas = ordem.horasEstimadas || 0;

      if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
        horasVencidas += horasEstimadas;
      } else if (isAfter(dataFim, nextWeekStart) && isBefore(dataFim, addWeeks(nextWeekStart, 1))) {
        horasProximaSemana += horasEstimadas;
      }
    });

    return { horasVencidas, horasProximaSemana };
  };

  const { horasVencidas, horasProximaSemana } = calculateWorkload();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Horas Necessárias (Vencidas)</p>
            <p className="text-2xl font-bold text-red-500">{horasVencidas}h</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Timer className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Horas Previstas (Próxima Semana)</p>
            <p className="text-2xl font-bold text-blue-500">{horasProximaSemana}h</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default WorkloadStats;
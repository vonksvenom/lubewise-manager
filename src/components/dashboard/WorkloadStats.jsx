import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, Timer, Users } from "lucide-react";
import { isAfter, isBefore, addWeeks, startOfWeek, addMonths, isWithinInterval } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userService } from "@/services/dataService";
import MaintenanceOrdersDialog from "./MaintenanceOrdersDialog";
import TechniciansDialog from "./TechniciansDialog";

const WorkloadStats = ({ ordensServico = [], timeFrame = "day" }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [techDialogOpen, setTechDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");
  
  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));
  const nextMonthStart = addMonths(today, 1);

  const technicians = userService.getAll().filter(user => user.role === "technician");
  
  // Calcula o total de horas disponíveis baseado no timeFrame
  const calculateTotalAvailableHours = () => {
    const totalDailyHours = technicians.reduce((total, tech) => 
      total + Number(tech.horasDisponiveis || 0), 0
    );

    switch (timeFrame) {
      case "week":
        return totalDailyHours * 5; // 5 dias úteis
      case "month":
        return totalDailyHours * 22; // média de 22 dias úteis
      default:
        return totalDailyHours;
    }
  };

  const totalAvailableHours = calculateTotalAvailableHours();

  const calculateWorkload = () => {
    let horasVencidas = 0;
    let horasPrevistas = 0;

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const dataInicio = new Date(ordem.dataInicio);
      const horasEstimadas = Number(ordem.horasEstimadas) || 0;

      // Calcula horas vencidas
      if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
        horasVencidas += horasEstimadas;
      }

      // Calcula horas previstas baseado no timeframe
      const nextPeriodEnd = timeFrame === "week" 
        ? addWeeks(today, 1) 
        : timeFrame === "month" 
          ? addMonths(today, 1) 
          : new Date(today.setHours(23, 59, 59, 999));

      if (isWithinInterval(dataInicio, { start: today, end: nextPeriodEnd })) {
        horasPrevistas += horasEstimadas;
      }
    });

    return { horasVencidas, horasPrevistas };
  };

  const { horasVencidas, horasPrevistas } = calculateWorkload();
  
  // Calcula a porcentagem de aderência
  const adherencePercentage = totalAvailableHours > 0 
    ? Math.min(100, Math.round((horasPrevistas / totalAvailableHours) * 100))
    : 0;

  // Calcula o número de técnicos adicionais necessários
  const horasDisponiveisPorTecnico = technicians.length > 0 
    ? totalAvailableHours / technicians.length 
    : 0;
    
  const additionalTechniciansNeeded = horasDisponiveisPorTecnico > 0
    ? Math.max(0, Math.ceil(horasVencidas / horasDisponiveisPorTecnico))
    : 0;

  const handleOverdueClick = () => {
    const overdueOrders = ordensServico.filter(ordem => 
      isBefore(new Date(ordem.dataFim), today) && 
      ordem.status !== "Concluída"
    );
    setSelectedOrders(overdueOrders);
    setDialogTitle("Ordens Vencidas");
    setDialogOpen(true);
  };

  const handlePlannedHoursClick = () => {
    setTechDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard>
        <div 
          className="flex items-center gap-4 cursor-pointer hover:bg-accent/5 p-2 rounded-lg transition-colors"
          onClick={handleOverdueClick}
        >
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
        <div 
          className="flex items-center gap-4 cursor-pointer hover:bg-accent/5 p-2 rounded-lg transition-colors"
          onClick={handlePlannedHoursClick}
        >
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Timer className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Horas Previstas</p>
            <p className="text-2xl font-bold text-blue-500">{horasPrevistas}h</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Operacionais Adicionais Necessários</p>
            <p className="text-2xl font-bold text-purple-500">{additionalTechniciansNeeded}</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Aderência ao Planejado</p>
            <p className="text-2xl font-bold text-green-500">{adherencePercentage}%</p>
          </div>
        </div>
      </DashboardCard>

      <MaintenanceOrdersDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        orders={selectedOrders}
        title={dialogTitle}
      />

      <TechniciansDialog
        open={techDialogOpen}
        onOpenChange={setTechDialogOpen}
      />
    </div>
  );
};

export default WorkloadStats;
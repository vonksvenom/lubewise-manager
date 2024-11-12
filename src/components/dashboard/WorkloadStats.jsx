import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, Timer, Users } from "lucide-react";
import { isAfter, isBefore, addWeeks, startOfWeek, addMonths } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userService } from "@/services/dataService";
import MaintenanceOrdersDialog from "./MaintenanceOrdersDialog";

const WorkloadStats = ({ ordensServico = [] }) => {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState("week");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");
  
  const today = new Date();
  const nextWeekStart = startOfWeek(addWeeks(today, 1));
  const nextMonthStart = addMonths(today, 1);

  const technicians = userService.getAll().filter(user => user.role === "technician");
  const totalAvailableHours = technicians.reduce((total, tech) => 
    total + Number(tech.horasDisponiveis || 0), 0
  );

  const calculateWorkload = () => {
    let horasVencidas = 0;
    let horasPrevistas = 0;

    ordensServico.forEach(ordem => {
      const dataFim = new Date(ordem.dataFim);
      const horasEstimadas = ordem.horasEstimadas || 0;

      if (isBefore(dataFim, today) && ordem.status !== "Concluída") {
        horasVencidas += horasEstimadas;
      } else if (timeframe === "week" && 
                 isAfter(dataFim, nextWeekStart) && 
                 isBefore(dataFim, addWeeks(nextWeekStart, 1))) {
        horasPrevistas += horasEstimadas;
      } else if (timeframe === "month" && 
                 isAfter(dataFim, today) && 
                 isBefore(dataFim, nextMonthStart)) {
        horasPrevistas += horasEstimadas;
      }
    });

    return { horasVencidas, horasPrevistas };
  };

  const { horasVencidas, horasPrevistas } = calculateWorkload();
  
  const adherencePercentage = totalAvailableHours > 0 
    ? Math.round((horasPrevistas / totalAvailableHours) * 100) 
    : 0;

  const additionalTechniciansNeeded = Math.ceil(
    horasVencidas / (totalAvailableHours / technicians.length)
  );

  const handleOverdueClick = () => {
    const overdueOrders = ordensServico.filter(ordem => 
      isBefore(new Date(ordem.dataFim), today) && 
      ordem.status !== "Concluída"
    );
    setSelectedOrders(overdueOrders);
    setDialogTitle("Ordens Vencidas");
    setDialogOpen(true);
  };

  const handleTechniciansClick = () => {
    setDialogOpen(true);
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
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Timer className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <div className="mb-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-400">Horas Previstas</p>
            <p className="text-2xl font-bold text-blue-500">{horasPrevistas}h</p>
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

      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Técnicos Adicionais Necessários</p>
            <p className="text-2xl font-bold text-purple-500">{additionalTechniciansNeeded}</p>
          </div>
        </div>
      </DashboardCard>

      <MaintenanceOrdersDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        orders={selectedOrders}
        title={dialogTitle}
      />
    </div>
  );
};

export default WorkloadStats;
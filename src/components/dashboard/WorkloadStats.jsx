import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock, AlertTriangle, Timer, Users } from "lucide-react";
import { useState } from "react";
import { userService } from "@/services/dataService";
import MaintenanceOrdersDialog from "./MaintenanceOrdersDialog";
import TechniciansDialog from "./TechniciansDialog";
import { WorkloadStatsCard } from "./WorkloadStatsCard";
import { calculateTotalAvailableHours, calculateWorkload } from "./WorkloadCalculations";

const WorkloadStats = ({ ordensServico = [], timeFrame = "day" }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [techDialogOpen, setTechDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");
  
  const today = new Date();
  const technicians = userService.getAll().filter(user => user.role === "technician");
  const totalAvailableHours = calculateTotalAvailableHours(technicians, timeFrame);
  const { horasVencidas, horasPrevistas, horasPorTipo } = calculateWorkload(ordensServico, today, timeFrame);
  
  const adherencePercentage = totalAvailableHours > 0 
    ? Math.min(100, Math.round((horasPrevistas / totalAvailableHours) * 100))
    : 0;

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard>
          <WorkloadStatsCard
            icon={AlertTriangle}
            title="Horas Necessárias (Vencidas)"
            value={`${horasVencidas}h`}
            color="red"
            onClick={handleOverdueClick}
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Timer}
            title="Horas Previstas"
            value={`${horasPrevistas}h`}
            color="blue"
            onClick={() => setTechDialogOpen(true)}
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Users}
            title="Operacionais Adicionais Necessários"
            value={additionalTechniciansNeeded}
            color="purple"
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Clock}
            title="Aderência ao Planejado"
            value={`${adherencePercentage}%`}
            color="green"
          />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard>
          <WorkloadStatsCard
            icon={Clock}
            title="Horas em Preventivas"
            value={`${horasPorTipo.Preventiva}h`}
            color="blue"
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Clock}
            title="Horas em Corretivas"
            value={`${horasPorTipo.Corretiva}h`}
            color="orange"
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Clock}
            title="Horas em Preditivas"
            value={`${horasPorTipo.Preditiva}h`}
            color="purple"
          />
        </DashboardCard>

        <DashboardCard>
          <WorkloadStatsCard
            icon={Clock}
            title="Outras Horas"
            value={`${horasPorTipo.Outros}h`}
            color="slate"
          />
        </DashboardCard>
      </div>

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
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplet,
  TrendingUp,
  Activity,
  Calendar
} from "lucide-react";
import { ordemServicoService, equipamentoService, inventarioService } from "@/services/dataService";
import { format } from "date-fns";
import { InventoryChart } from "@/components/InventoryChart";
import { InventarioSummary } from "@/components/InventarioSummary";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const { t } = useTranslation();
  const ordensServico = ordemServicoService.getAll();
  const equipamentos = equipamentoService.getAll();
  const inventario = inventarioService.getAll();

  // KPI Data calculado a partir dos serviços
  const kpiData = {
    equipmentTotal: equipamentos.length,
    pendingMaintenance: ordensServico.filter(os => os.status === "Pendente").length,
    completedMonth: ordensServico.filter(os => os.status === "Concluída").length,
    nextScheduled: ordensServico.filter(os => os.status === "Agendada").length,
    efficiency: calculateEfficiency(ordensServico),
    uptime: calculateUptime(ordensServico)
  };

  // Calcula eficiência baseada nas ordens de serviço
  function calculateEfficiency(orders) {
    const completed = orders.filter(o => o.status === "Concluída").length;
    const total = orders.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // Calcula uptime baseado nas ordens de serviço
  function calculateUptime(orders) {
    const totalHours = 24 * 30; // Horas no mês
    const maintenanceHours = orders
      .filter(o => o.status === "Em Andamento" || o.status === "Concluída")
      .reduce((acc, order) => acc + (order.horasEstimadas || 0), 0);
    return Math.round(((totalHours - maintenanceHours) / totalHours) * 100);
  }

  // Equipment Status Data calculado a partir dos equipamentos
  const equipmentStatusData = [
    { 
      name: "Operacional", 
      value: equipamentos.filter(eq => !ordensServico.some(os => 
        os.equipamentoId === eq.id && 
        (os.status === "Em Andamento" || os.status === "Pendente")
      )).length,
      color: "#22c55e" 
    },
    { 
      name: "Em Manutenção", 
      value: ordensServico.filter(os => 
        os.status === "Em Andamento"
      ).length,
      color: "#eab308" 
    },
    { 
      name: "Crítico", 
      value: ordensServico.filter(os => 
        os.status === "Pendente" && 
        os.prioridade === "Urgente"
      ).length,
      color: "#ef4444" 
    }
  ];

  // Maintenance Efficiency Data calculado a partir das ordens de serviço
  const efficiencyData = calculateMaintenanceEfficiency(ordensServico);

  function calculateMaintenanceEfficiency(orders) {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return format(date, "MMM");
    }).reverse();

    return last6Months.map(month => {
      const monthOrders = orders.filter(order => 
        format(new Date(order.dataInicio), "MMM") === month
      );
      
      const total = monthOrders.length;
      const preventive = monthOrders.filter(order => 
        order.tipo === "Preventiva"
      ).length;
      
      return {
        month,
        preventive: total ? Math.round((preventive / total) * 100) : 0,
        corrective: total ? Math.round(((total - preventive) / total) * 100) : 0
      };
    });
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-catYellow">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-catYellow" />
          <span className="text-gray-400">
            Última atualização: {format(new Date(), "dd/MM/yyyy HH:mm")}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-muted to-accent border-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Equipamentos</p>
              <p className="text-2xl font-bold text-primary">{kpiData.equipmentTotal}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-muted to-accent border-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Manutenções Pendentes</p>
              <p className="text-2xl font-bold text-yellow-500">{kpiData.pendingMaintenance}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-muted to-accent border-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Eficiência Geral</p>
              <p className="text-2xl font-bold text-green-500">{kpiData.efficiency}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Equipment Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-catYellow">Status dos Equipamentos</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={equipmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {equipmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Maintenance Efficiency */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-catYellow">Eficiência da Manutenção</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                <XAxis dataKey="month" stroke="#E4941A" />
                <YAxis stroke="#E4941A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    border: "1px solid #666",
                    color: "#E4941A",
                  }}
                />
                <Legend />
                <Bar dataKey="preventive" name="Preventiva %" fill="#22c55e" />
                <Bar dataKey="corrective" name="Corretiva %" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Inventory Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-catYellow">Consumo de Lubrificantes</h2>
          <InventoryChart />
        </Card>

        {/* Inventory Summary */}
        <Card className="p-6">
          <InventarioSummary />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
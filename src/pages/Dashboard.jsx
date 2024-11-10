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
import { ordemServicoService } from "@/services/dataService";
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

  // KPI Data
  const kpiData = {
    equipmentTotal: 48,
    pendingMaintenance: 7,
    completedMonth: 23,
    nextScheduled: 5,
    efficiency: 92,
    uptime: 98.5
  };

  // Equipment Status Data for Pie Chart
  const equipmentStatusData = [
    { name: "Operacional", value: 38, color: "#22c55e" },
    { name: "Em Manutenção", value: 7, color: "#eab308" },
    { name: "Crítico", value: 3, color: "#ef4444" }
  ];

  // Maintenance Efficiency Data
  const efficiencyData = [
    { month: "Jan", preventive: 85, corrective: 15 },
    { month: "Fev", preventive: 82, corrective: 18 },
    { month: "Mar", preventive: 88, corrective: 12 },
    { month: "Abr", preventive: 90, corrective: 10 },
    { month: "Mai", preventive: 92, corrective: 8 },
    { month: "Jun", preventive: 91, corrective: 9 }
  ];

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
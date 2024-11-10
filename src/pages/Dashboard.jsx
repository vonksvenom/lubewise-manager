import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplet
} from "lucide-react";
import { ordemServicoService } from "@/services/dataService";
import { format } from "date-fns";
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
} from "recharts";

const Dashboard = () => {
  const { t } = useTranslation();
  const ordensServico = ordemServicoService.getAll();

  // Calculate completion percentage
  const calculateCompletionData = () => {
    const today = new Date();
    const monthsData = {};
    
    ordensServico.forEach(ordem => {
      const month = format(new Date(ordem.dataInicio), 'MMM/yyyy');
      if (!monthsData[month]) {
        monthsData[month] = { total: 0, completed: 0 };
      }
      monthsData[month].total += 1;
      if (ordem.status === 'Concluída') {
        monthsData[month].completed += 1;
      }
    });

    return Object.entries(monthsData).map(([month, data]) => ({
      month,
      percentual: (data.completed / data.total) * 100
    }));
  };

  // Get recent activities
  const recentActivities = ordensServico
    .filter(ordem => ordem.status === 'Concluída')
    .sort((a, b) => new Date(b.dataFim) - new Date(a.dataFim))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-catYellow">{t('dashboard')}</h1>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.equipment')}</p>
              <p className="text-2xl font-bold">48</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.pendingMaintenance')}</p>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.completedMonth')}</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Droplet className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('stats.lubricants')}</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Execution Chart */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-catYellow">
          Percentual de Execução das Ordens de Serviço
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculateCompletionData()}>
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
              <Bar
                dataKey="percentual"
                fill="#E4941A"
                name="Percentual de Conclusão"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-catYellow">
          {t('recentActivities')}
        </h2>
        <div className="space-y-4">
          {recentActivities.map((ordem) => (
            <div
              key={ordem.id}
              className="flex items-center gap-4 p-3 bg-muted rounded-lg"
            >
              <CheckCircle className="h-5 w-5 text-catYellow" />
              <div>
                <p className="font-medium text-catYellow">{ordem.titulo}</p>
                <p className="text-sm text-gray-400">
                  Concluída em {format(new Date(ordem.dataFim), 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
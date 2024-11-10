import { Card } from "@/components/ui/card";
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplet
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Equipamentos</p>
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
              <p className="text-sm text-gray-500">Manutenções Pendentes</p>
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
              <p className="text-sm text-gray-500">Concluídas (Mês)</p>
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
              <p className="text-sm text-gray-500">Lubrificantes</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Manutenção Preventiva - Máquina #23</p>
                <p className="text-sm text-gray-500">Agendada para hoje às 14:00</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

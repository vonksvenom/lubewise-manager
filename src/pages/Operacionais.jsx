import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import TecnicoForm from "@/components/operacionais/TecnicoForm";
import TecnicoTable from "@/components/operacionais/TecnicoTable";
import WorkloadStats from "@/components/dashboard/WorkloadStats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ordemServicoService } from "@/services/dataService";

const Operacionais = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const { isAdmin, isPowerUser } = useAuth();
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const ordensServico = ordemServicoService.getAll();

  if (!isAdmin && !isPowerUser) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">
          Acesso Restrito
        </h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Operacionais</h1>
        <Button onClick={() => setDialogOpen(true)}>
          Adicionar Operacional
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tempo Disponível</h2>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Por Dia</SelectItem>
              <SelectItem value="week">Por Semana</SelectItem>
              <SelectItem value="month">Por Mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <WorkloadStats ordensServico={ordensServico} timeFrame={timeFrame} />
      </Card>

      <TecnicoTable />
      <TecnicoForm open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Operacionais;
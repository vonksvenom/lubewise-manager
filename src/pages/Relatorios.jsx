import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { FileText, Download } from "lucide-react";
import { ordemServicoService, equipamentoService, lubrificanteService } from "@/services/dataService";

const Relatorios = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const generatePDF = async (reportType) => {
    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas inicial e final");
      return;
    }

    // Here you would implement the actual PDF generation
    // For now, we'll just show a success message
    toast.success(`Relatório ${reportType} gerado com sucesso!`);
  };

  const getAvailableDates = () => {
    const ordensServico = ordemServicoService.getAll();
    const dates = ordensServico.map(ordem => new Date(ordem.dataInicio));
    return {
      min: new Date(Math.min(...dates)),
      max: new Date(Math.max(...dates))
    };
  };

  const { min, max } = getAvailableDates();

  const reportTypes = [
    {
      title: "Overview Geral",
      description: "Visão geral de todas as operações",
      onClick: () => generatePDF("overview"),
    },
    {
      title: "Análise por Empresa",
      description: "Relatório detalhado por empresa",
      onClick: () => generatePDF("empresa"),
    },
    {
      title: "Análise por Local",
      description: "Relatório detalhado por localização",
      onClick: () => generatePDF("local"),
    },
    {
      title: "Consumo de Lubrificantes",
      description: "Análise de consumo de lubrificantes",
      onClick: () => generatePDF("lubrificantes"),
    },
    {
      title: "Manutenções por Equipamento",
      description: "Histórico de manutenções por equipamento",
      onClick: () => generatePDF("manutencoes"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatórios</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Inicial</label>
              <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                fromDate={min}
                toDate={max}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Final</label>
              <DatePicker
                date={endDate}
                onDateChange={setEndDate}
                fromDate={min}
                toDate={max}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{report.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {report.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={report.onClick}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Relatorios;
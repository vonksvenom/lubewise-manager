import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Upload, RefreshCw, Database, FileJson } from "lucide-react";

export const SystemSettings = () => {
  const handleBackup = () => {
    toast.success("Backup do sistema iniciado com sucesso!");
    // Simula um backup
    setTimeout(() => {
      toast.success("Backup concluído com sucesso!");
    }, 2000);
  };

  const handleRestore = () => {
    toast.success("Restauração do sistema iniciada!");
    // Simula uma restauração
    setTimeout(() => {
      toast.success("Sistema restaurado com sucesso!");
    }, 2000);
  };

  const handleExportLogs = () => {
    toast.success("Exportação de logs iniciada!");
    // Simula exportação de logs
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'system_logs.txt';
      link.click();
      toast.success("Logs exportados com sucesso!");
    }, 1500);
  };

  const handleDatabaseOptimize = () => {
    toast.success("Otimização do banco de dados iniciada!");
    // Simula otimização
    setTimeout(() => {
      toast.success("Banco de dados otimizado com sucesso!");
    }, 3000);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Configurações de Sistema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
          onClick={handleBackup}
        >
          <Download className="h-4 w-4" />
          Realizar Backup
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
          onClick={handleRestore}
        >
          <Upload className="h-4 w-4" />
          Restaurar Sistema
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
          onClick={handleExportLogs}
        >
          <FileJson className="h-4 w-4" />
          Exportar Logs
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
          onClick={handleDatabaseOptimize}
        >
          <Database className="h-4 w-4" />
          Otimizar Banco de Dados
        </Button>
      </div>
    </Card>
  );
};
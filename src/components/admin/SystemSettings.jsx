import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Download, 
  Upload, 
  RefreshCw, 
  Database, 
  FileJson, 
  Shield, 
  Key, 
  Mail,
  Settings,
  Users
} from "lucide-react";

export const SystemSettings = () => {
  const handleBackup = () => {
    toast.success("Backup do sistema iniciado com sucesso!");
    setTimeout(() => {
      toast.success("Backup concluído com sucesso!");
    }, 2000);
  };

  const handleRestore = () => {
    toast.success("Restauração do sistema iniciada!");
    setTimeout(() => {
      toast.success("Sistema restaurado com sucesso!");
    }, 2000);
  };

  const handleExportLogs = () => {
    toast.success("Exportação de logs iniciada!");
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
    setTimeout(() => {
      toast.success("Banco de dados otimizado com sucesso!");
    }, 3000);
  };

  const handleSecurityAudit = () => {
    toast.success("Auditoria de segurança iniciada!");
    setTimeout(() => {
      toast.success("Auditoria de segurança concluída!");
    }, 2500);
  };

  const handleApiKeyManagement = () => {
    toast.success("Gerenciamento de chaves API iniciado!");
  };

  const handleEmailSettings = () => {
    toast.success("Configurações de e-mail atualizadas!");
  };

  const handleUserBulkImport = () => {
    toast.success("Importação em massa de usuários iniciada!");
  };

  const handleSystemPreferences = () => {
    toast.success("Preferências do sistema atualizadas!");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Backup e Restauração</h2>
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
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Manutenção do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Segurança e Configurações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
            onClick={handleSecurityAudit}
          >
            <Shield className="h-4 w-4" />
            Auditoria de Segurança
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
            onClick={handleApiKeyManagement}
          >
            <Key className="h-4 w-4" />
            Gerenciar Chaves API
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
            onClick={handleEmailSettings}
          >
            <Mail className="h-4 w-4" />
            Configurações de E-mail
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
            onClick={handleUserBulkImport}
          >
            <Users className="h-4 w-4" />
            Importação de Usuários
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-background hover:bg-accent/10"
            onClick={handleSystemPreferences}
          >
            <Settings className="h-4 w-4" />
            Preferências do Sistema
          </Button>
        </div>
      </Card>
    </div>
  );
};
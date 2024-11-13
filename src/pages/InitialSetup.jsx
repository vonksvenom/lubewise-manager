import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const InitialSetup = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    systemName: "LubriTRacker",
    databaseUrl: "",
    databaseUser: "",
    databasePassword: "",
    serverPort: "3000",
    databaseType: "postgresql",
    serverHost: "localhost",
    emailServer: "",
    emailPort: "",
    emailUser: "",
    emailPassword: "",
    backupPath: "",
    logsPath: "",
  });

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!config.databaseUrl || !config.databaseUser || !config.databasePassword) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Here we would typically save the configuration to a server
    // For now, we'll just show a success message and redirect
    localStorage.setItem('systemConfig', JSON.stringify(config));
    
    toast.success("Configurações salvas com sucesso!");
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LubriTRacker
          </h1>
          <p className="text-muted-foreground">
            Configuração inicial do sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="systemName">Nome do Sistema</Label>
              <Input
                id="systemName"
                value={config.systemName}
                onChange={(e) => handleChange("systemName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serverPort">Porta do Servidor</Label>
              <Input
                id="serverPort"
                value={config.serverPort}
                onChange={(e) => handleChange("serverPort", e.target.value)}
                placeholder="Ex: 3000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="databaseType">Tipo de Banco de Dados</Label>
              <Input
                id="databaseType"
                value={config.databaseType}
                onChange={(e) => handleChange("databaseType", e.target.value)}
                placeholder="Ex: postgresql"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serverHost">Host do Servidor</Label>
              <Input
                id="serverHost"
                value={config.serverHost}
                onChange={(e) => handleChange("serverHost", e.target.value)}
                placeholder="Ex: localhost"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="databaseUrl">URL do Banco de Dados</Label>
              <Input
                id="databaseUrl"
                value={config.databaseUrl}
                onChange={(e) => handleChange("databaseUrl", e.target.value)}
                placeholder="Ex: postgresql://localhost:5432/lubritracker"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="databaseUser">Usuário do Banco de Dados</Label>
              <Input
                id="databaseUser"
                value={config.databaseUser}
                onChange={(e) => handleChange("databaseUser", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="databasePassword">Senha do Banco de Dados</Label>
              <Input
                id="databasePassword"
                type="password"
                value={config.databasePassword}
                onChange={(e) => handleChange("databasePassword", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailServer">Servidor de Email</Label>
              <Input
                id="emailServer"
                value={config.emailServer}
                onChange={(e) => handleChange("emailServer", e.target.value)}
                placeholder="Ex: smtp.gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailPort">Porta do Email</Label>
              <Input
                id="emailPort"
                value={config.emailPort}
                onChange={(e) => handleChange("emailPort", e.target.value)}
                placeholder="Ex: 587"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailUser">Usuário do Email</Label>
              <Input
                id="emailUser"
                value={config.emailUser}
                onChange={(e) => handleChange("emailUser", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailPassword">Senha do Email</Label>
              <Input
                id="emailPassword"
                type="password"
                value={config.emailPassword}
                onChange={(e) => handleChange("emailPassword", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupPath">Caminho para Backups</Label>
              <Input
                id="backupPath"
                value={config.backupPath}
                onChange={(e) => handleChange("backupPath", e.target.value)}
                placeholder="Ex: /var/backups/lubritracker"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logsPath">Caminho para Logs</Label>
              <Input
                id="logsPath"
                value={config.logsPath}
                onChange={(e) => handleChange("logsPath", e.target.value)}
                placeholder="Ex: /var/log/lubritracker"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" size="lg">
              Salvar Configurações
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InitialSetup;
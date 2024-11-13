import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const InitialSetup = () => {
  const [config, setConfig] = useState({
    systemName: "LubriTRacker",
    databaseUrl: "",
    databaseUser: "",
    databasePassword: "",
    serverPort: "3000",
  });

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui implementaremos a lógica de salvar as configurações
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LubriTRacker
          </h1>
          <p className="text-muted-foreground">
            Configuração inicial do sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="systemName">Nome do Sistema</Label>
            <Input
              id="systemName"
              value={config.systemName}
              onChange={(e) => handleChange("systemName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="databaseUrl">URL do Banco de Dados</Label>
            <Input
              id="databaseUrl"
              value={config.databaseUrl}
              onChange={(e) => handleChange("databaseUrl", e.target.value)}
              placeholder="Ex: postgresql://localhost:5432/lubritracker"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="databaseUser">Usuário do Banco de Dados</Label>
            <Input
              id="databaseUser"
              value={config.databaseUser}
              onChange={(e) => handleChange("databaseUser", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="databasePassword">Senha do Banco de Dados</Label>
            <Input
              id="databasePassword"
              type="password"
              value={config.databasePassword}
              onChange={(e) => handleChange("databasePassword", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serverPort">Porta do Servidor</Label>
            <Input
              id="serverPort"
              value={config.serverPort}
              onChange={(e) => handleChange("serverPort", e.target.value)}
              placeholder="Ex: 3000"
            />
          </div>

          <Button type="submit" className="w-full">
            Salvar Configurações
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default InitialSetup;
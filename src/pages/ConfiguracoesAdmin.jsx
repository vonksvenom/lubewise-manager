import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { themes } from "@/config/themes";

const ConfiguracoesAdmin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-catYellow">Configurações Administrativas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Temas do Sistema</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <Button
                key={key}
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Implementação futura da mudança de tema
                  toast.success(`Tema ${theme.name} aplicado com sucesso!`);
                }}
              >
                {theme.name}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configurações de Sistema</h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast.info("Backup iniciado")}
            >
              Realizar Backup do Sistema
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast.info("Logs exportados")}
            >
              Exportar Logs do Sistema
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfiguracoesAdmin;
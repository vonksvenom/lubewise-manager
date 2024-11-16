import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <Card className="p-8 shadow-neo bg-background">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
          Bem-vindo ao LubriTracker
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Sistema de gerenciamento de lubrificação e manutenção industrial
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            className="p-6 h-auto flex flex-col items-center gap-2 shadow-neo hover:shadow-neo-xl transition-all"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-lg font-semibold">Dashboard</span>
            <span className="text-sm text-muted-foreground text-center">
              Visualize estatísticas e informações importantes
            </span>
          </Button>

          <Button
            variant="outline"
            className="p-6 h-auto flex flex-col items-center gap-2 shadow-neo hover:shadow-neo-xl transition-all"
            onClick={() => navigate("/ordens-servico")}
          >
            <span className="text-lg font-semibold">Ordens de Serviço</span>
            <span className="text-sm text-muted-foreground text-center">
              Gerencie as ordens de manutenção
            </span>
          </Button>

          <Button
            variant="outline"
            className="p-6 h-auto flex flex-col items-center gap-2 shadow-neo hover:shadow-neo-xl transition-all"
            onClick={() => navigate("/equipamentos")}
          >
            <span className="text-lg font-semibold">Equipamentos</span>
            <span className="text-sm text-muted-foreground text-center">
              Cadastre e monitore seus equipamentos
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
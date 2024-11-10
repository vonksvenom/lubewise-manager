import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { themes } from "@/config/themes";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ThemeSettings = ({ currentTheme, onThemeChange }) => {
  const { isAdmin, isPowerUser } = useAuth();

  const handleThemeChange = (theme) => {
    if (isAdmin || isPowerUser) {
      document.documentElement.style.setProperty('--background', themes[theme].colors.background);
      document.documentElement.style.setProperty('--foreground', themes[theme].colors.foreground);
      document.documentElement.style.setProperty('--primary', themes[theme].colors.primary);
      document.documentElement.style.setProperty('--secondary', themes[theme].colors.secondary);
      document.documentElement.style.setProperty('--accent', themes[theme].colors.accent);
      document.documentElement.style.setProperty('--muted', themes[theme].colors.muted);
      
      onThemeChange(theme);
      toast.success(`Tema ${themes[theme].name} aplicado com sucesso!`);
    } else {
      toast.error("Apenas administradores podem alterar o tema!");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Temas do Sistema</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            Selecionar Tema
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Escolha um Tema</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(themes).map(([key, theme]) => (
                <Button
                  key={key}
                  variant={currentTheme === key ? "default" : "outline"}
                  className={`w-full transition-colors ${
                    currentTheme === key 
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => handleThemeChange(key)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span>{theme.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
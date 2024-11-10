import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { themes } from "@/config/themes";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const ThemeSettings = ({ currentTheme, onThemeChange }) => {
  const { isAdmin, isPowerUser } = useAuth();

  const handleThemeChange = (theme) => {
    if (isAdmin || isPowerUser) {
      onThemeChange(theme);
    } else {
      toast.error("Apenas administradores podem alterar o tema!");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Temas do Sistema</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <Button
            key={key}
            variant={currentTheme === key ? "default" : "outline"}
            className="w-full"
            onClick={() => handleThemeChange(key)}
          >
            {theme.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};
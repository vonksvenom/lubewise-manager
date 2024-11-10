import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ThemeSettings } from "@/components/admin/ThemeSettings";
import { SystemSettings } from "@/components/admin/SystemSettings";

const ConfiguracoesAdmin = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.style.setProperty('--background', themes[theme].colors.background);
    document.documentElement.style.setProperty('--foreground', themes[theme].colors.foreground);
    document.documentElement.style.setProperty('--primary', themes[theme].colors.primary);
    document.documentElement.style.setProperty('--secondary', themes[theme].colors.secondary);
    document.documentElement.style.setProperty('--accent', themes[theme].colors.accent);
    document.documentElement.style.setProperty('--muted', themes[theme].colors.muted);
    toast.success("Tema atualizado com sucesso!");
  };

  if (!isAdmin) {
    toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
    navigate("/");
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-catYellow">Configurações Administrativas</h1>
      <div className="grid grid-cols-1 gap-6">
        <ThemeSettings currentTheme={currentTheme} onThemeChange={handleThemeChange} />
        <SystemSettings />
      </div>
    </div>
  );
};

export default ConfiguracoesAdmin;
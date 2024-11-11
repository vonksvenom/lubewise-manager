import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { themes } from "@/config/themes";
import { userService } from "@/services/dataService";
import { toast } from "sonner";
import { navItems } from "../nav-items";
import LayoutHeader from "./layout/LayoutHeader";
import LayoutSidebar from "./layout/LayoutSidebar";
import LayoutControls from "./layout/LayoutControls";

const CURRENT_USER_KEY = "user"; // Added constant definition

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('corporate');
  const [logoUrl, setLogoUrl] = useState("https://images.cws.digital/fornecedores/m/sotreq-industrial.jpg");
  const { t, i18n } = useTranslation();
  const { user, isAdmin, isPowerUser, logout } = useAuth();
  const currentUser = userService.getCurrentUser();

  useEffect(() => {
    const resetData = () => {
      const currentUser = userService.getCurrentUser();
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
      
      const userTheme = localStorage.getItem(`theme_${currentUser?.id}`);
      if (userTheme) {
        handleThemeChange(userTheme, true);
      }

      const savedLogo = localStorage.getItem('logoUrl');
      if (savedLogo) {
        setLogoUrl(savedLogo);
      }
    };

    resetData();
  }, []);

  useEffect(() => {
    const userTheme = localStorage.getItem(`theme_${currentUser?.id}`);
    if (userTheme) {
      handleThemeChange(userTheme, true);
      return;
    }

    const companyDefaultTheme = localStorage.getItem('company_default_theme');
    if (companyDefaultTheme) {
      handleThemeChange(companyDefaultTheme, true);
      return;
    }

    handleThemeChange('corporate', true);

    const savedLogo = localStorage.getItem('logoUrl');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, [currentUser]);

  const handleThemeChange = (theme, isInitialLoad = false) => {
    setCurrentTheme(theme);
    const themeColors = themes[theme].colors;
    
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    if (!isInitialLoad && (isAdmin || isPowerUser) && theme !== currentTheme) {
      const setAsDefault = window.confirm("Deseja definir este tema como padrão para todos os usuários?");
      if (setAsDefault) {
        localStorage.setItem('company_default_theme', theme);
        toast.success("Tema definido como padrão para todos os usuários!");
      }
    }

    if (currentUser) {
      localStorage.setItem(`theme_${currentUser.id}`, theme);
      userService.update(currentUser.id, { theme: theme });
      if (!isInitialLoad && theme !== 'corporate') {
        toast.success("Tema atualizado e salvo com sucesso!");
      }
    }
  };

  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background to-accent/5">
      <LayoutHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <LayoutSidebar 
        sidebarOpen={sidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        logoUrl={logoUrl}
        navItems={filteredNavItems}
      />

      <div className={`transition-all duration-200 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} min-h-screen`}>
        <main className="p-6">
          {children}
          <LayoutControls 
            isAdmin={isAdmin}
            isPowerUser={isPowerUser}
            onThemeChange={handleThemeChange}
            currentTheme={currentTheme}
            onLogoChange={(newLogo) => {
              setLogoUrl(newLogo);
              localStorage.setItem('logoUrl', newLogo);
            }}
            i18n={i18n}
            logout={logout}
          />
        </main>
      </div>
    </div>
  );
};

export default Layout;
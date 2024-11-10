import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { themes } from "@/config/themes";
import { 
  Menu,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  Upload,
  LogOut,
  Palette,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { userService } from "@/services/dataService";
import { toast } from "sonner";
import { navItems } from "../nav-items";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [logoUrl, setLogoUrl] = useState("/sotreq-industrial-logo.png");
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { logout, isAdmin, isPowerUser } = useAuth();
  const currentUser = userService.getCurrentUser();

  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin())
  );

  const handleThemeChange = (theme) => {
    if (isAdmin() || isPowerUser()) {
      setCurrentTheme(theme);
      document.documentElement.style.setProperty('--background', themes[theme].colors.background);
      document.documentElement.style.setProperty('--foreground', themes[theme].colors.foreground);
      document.documentElement.style.setProperty('--primary', themes[theme].colors.primary);
      document.documentElement.style.setProperty('--secondary', themes[theme].colors.secondary);
      document.documentElement.style.setProperty('--accent', themes[theme].colors.accent);
      document.documentElement.style.setProperty('--muted', themes[theme].colors.muted);
      toast.success("Tema atualizado com sucesso!");
    } else {
      toast.error("Apenas administradores podem alterar o tema!");
    }
  };

  const handleLogoChange = (event) => {
    if (isAdmin() || isPowerUser()) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoUrl(reader.result);
          toast.success("Logo atualizado com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    } else {
      toast.error("Apenas administradores podem alterar o logo!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-muted rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="text-catYellow" /> : <Menu className="text-catYellow" />}
      </button>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {(isAdmin() || isPowerUser()) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Palette className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(themes).map(([key, theme]) => (
                <DropdownMenuItem key={key} onClick={() => handleThemeChange(key)}>
                  {theme.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={logout}
          className="text-red-500 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
        </Button>

        {(isAdmin() || isPowerUser()) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alterar Logo</DialogTitle>
              </DialogHeader>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="mt-4"
              />
            </DialogContent>
          </Dialog>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => i18n.changeLanguage('pt')}>
              Português
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => i18n.changeLanguage('es')}>
              Español
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-muted shadow-lg transform transition-all duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-center items-center bg-black/20">
            <img
              src={logoUrl}
              alt="Sotreq Industrial Logo"
              className={`${sidebarCollapsed ? 'h-8' : 'h-16'} object-contain transition-all duration-200`}
            />
          </div>
          <nav className="flex-1 p-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-md transition-colors ${
                  location.pathname === item.to
                    ? "bg-primary text-background"
                    : "text-catYellow hover:bg-accent"
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-4 text-catYellow hover:bg-accent rounded-md mx-2 mb-2 flex items-center justify-center"
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-200 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} min-h-screen`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
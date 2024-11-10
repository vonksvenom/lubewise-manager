import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Settings, 
  Wrench, 
  Calendar, 
  Package, 
  BarChart3, 
  Menu,
  X,
  Globe
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { title: t('dashboard'), icon: <BarChart3 />, path: "/" },
    { title: t('equipment'), icon: <Wrench />, path: "/equipamentos" },
    { title: t('workOrders'), icon: <Settings />, path: "/ordens" },
    { title: t('maintenance'), icon: <Calendar />, path: "/manutencoes" },
    { title: t('inventory'), icon: <Package />, path: "/inventario" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-muted rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="text-catYellow" /> : <Menu className="text-catYellow" />}
      </button>

      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => changeLanguage('pt')}>
              Português
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('es')}>
              Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('it')}>
              Italiano
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('da')}>
              Dansk
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('fr')}>
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-muted shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-center">
            <img
              src="https://images.cws.digital/fornecedores/m/sotreq-industrial.jpg"
              alt="Sotreq Logo"
              className="h-16 object-contain"
            />
          </div>
          <nav className="flex-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-background"
                    : "text-catYellow hover:bg-accent"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:ml-64 min-h-screen">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
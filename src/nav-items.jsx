import { HomeIcon, Wrench, Settings, Calendar, Package, Users, Factory, Cog, Drop } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Usuarios from "./pages/Usuarios";
import Inventario from "./pages/Inventario";
import Calendario from "./pages/Calendario";
import Areas from "./pages/Areas";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import Lubrificantes from "./pages/Lubrificantes";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Áreas",
    to: "/areas",
    icon: <Factory className="h-4 w-4" />,
    page: <Areas />,
  },
  {
    title: "Equipamentos",
    to: "/equipamentos",
    icon: <Wrench className="h-4 w-4" />,
    page: <Equipamentos />,
  },
  {
    title: "Ordens de Serviço",
    to: "/ordens",
    icon: <Settings className="h-4 w-4" />,
    page: <OrdensServico />,
  },
  {
    title: "Lubrificantes",
    to: "/lubrificantes",
    icon: <Drop className="h-4 w-4" />,
    page: <Lubrificantes />,
  },
  {
    title: "Usuários",
    to: "/usuarios",
    icon: <Users className="h-4 w-4" />,
    page: <Usuarios />,
  },
  {
    title: "Inventário",
    to: "/inventario",
    icon: <Package className="h-4 w-4" />,
    page: <Inventario />,
  },
  {
    title: "Calendário",
    to: "/calendario",
    icon: <Calendar className="h-4 w-4" />,
    page: <Calendario />,
  },
  {
    title: "Configurações Admin",
    to: "/admin/configuracoes",
    icon: <Cog className="h-4 w-4" />,
    page: <ConfiguracoesAdmin />,
    adminOnly: true,
  },
];
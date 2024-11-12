import { HomeIcon, Wrench, Settings, Calendar, Package, Users, Factory, Cog, Droplet, UserCog, Building } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Usuarios from "./pages/Usuarios";
import Inventario from "./pages/Inventario";
import Calendario from "./pages/Calendario";
import Areas from "./pages/Areas";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import ConfiguracoesPowerUser from "./pages/ConfiguracoesPowerUser";
import Lubrificantes from "./pages/Lubrificantes";
import Operacionais from "./pages/Operacionais";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Ordens de Serviço",
    to: "/ordens",
    icon: <Settings className="h-4 w-4" />,
    page: <OrdensServico />,
  },
  {
    title: "Calendário",
    to: "/calendario",
    icon: <Calendar className="h-4 w-4" />,
    page: <Calendario />,
  },
  {
    title: "Operacionais",
    to: "/operacionais",
    icon: <UserCog className="h-4 w-4" />,
    page: <Operacionais />,
    powerUserOnly: true,
  },
  {
    title: "Inventário",
    to: "/inventario",
    icon: <Package className="h-4 w-4" />,
    page: <Inventario />,
  },
  {
    title: "Lubrificantes",
    to: "/lubrificantes",
    icon: <Droplet className="h-4 w-4" />,
    page: <Lubrificantes />,
  },
  {
    title: "Equipamentos",
    to: "/equipamentos",
    icon: <Wrench className="h-4 w-4" />,
    page: <Equipamentos />,
  },
  {
    title: "Áreas",
    to: "/areas",
    icon: <Factory className="h-4 w-4" />,
    page: <Areas />,
  },
  {
    title: "Usuários",
    to: "/usuarios",
    icon: <Users className="h-4 w-4" />,
    page: <Usuarios />,
    adminOrPowerUserOnly: true,
  },
  {
    title: "Configurações Admin",
    to: "/admin/configuracoes",
    icon: <Cog className="h-4 w-4" />,
    page: <ConfiguracoesAdmin />,
    adminOnly: true,
  },
  {
    title: "Configurações PowerUser",
    to: "/poweruser/configuracoes",
    icon: <Building className="h-4 w-4" />,
    page: <ConfiguracoesPowerUser />,
    powerUserOnly: true,
  },
];

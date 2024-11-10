import { HomeIcon, Wrench, Settings, Calendar, Package } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Manutencoes from "./pages/Manutencoes";
import Estoque from "./pages/Estoque";
import Calendario from "./pages/Calendario";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
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
    title: "Manutenções",
    to: "/manutencoes",
    icon: <Calendar className="h-4 w-4" />,
    page: <Manutencoes />,
  },
  {
    title: "Estoque",
    to: "/estoque",
    icon: <Package className="h-4 w-4" />,
    page: <Estoque />,
  },
  {
    title: "Calendário",
    to: "/calendario",
    icon: <Calendar className="h-4 w-4" />,
    page: <Calendario />,
  },
];
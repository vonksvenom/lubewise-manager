import { HomeIcon, Wrench, Settings, Calendar, Package } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Manutencoes from "./pages/Manutencoes";
import Inventario from "./pages/Inventario";
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
];
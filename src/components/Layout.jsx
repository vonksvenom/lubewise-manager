import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Settings, 
  Tool, 
  Calendar, 
  Package, 
  BarChart3, 
  Menu,
  X
} from "lucide-react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "Dashboard", icon: <BarChart3 />, path: "/" },
    { title: "Equipamentos", icon: <Tool />, path: "/equipamentos" },
    { title: "Ordens de Serviço", icon: <Settings />, path: "/ordens" },
    { title: "Manutenções", icon: <Calendar />, path: "/manutencoes" },
    { title: "Estoque", icon: <Package />, path: "/estoque" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-primary">LubriCMMS</h1>
          </div>
          <nav className="flex-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
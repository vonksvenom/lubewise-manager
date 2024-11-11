import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarNav from "./SidebarNav";

const LayoutSidebar = ({ 
  sidebarOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  logoUrl, 
  navItems 
}) => (
  <div
    className={`fixed inset-y-0 left-0 z-40 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    } bg-gradient-to-br from-muted to-accent/10 backdrop-blur-sm shadow-neo-xl transform transition-all duration-200 ease-in-out lg:translate-x-0 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } rounded-r-2xl`}
  >
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-center items-center mb-6">
        <img
          src={logoUrl}
          alt="Company Logo"
          className={`${sidebarCollapsed ? 'h-12 w-12 object-contain' : 'h-14'} transition-all duration-200`}
          onError={(e) => {
            e.target.src = "/placeholder.svg";
            toast.error("Erro ao carregar o logo");
          }}
        />
      </div>
      
      <SidebarNav 
        navItems={navItems} 
        sidebarCollapsed={sidebarCollapsed} 
      />

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="p-4 text-catYellow hover:bg-accent rounded-xl mx-2 mb-2 flex items-center justify-center transform transition hover:scale-105 shadow-lg bg-gradient-to-br from-muted to-accent/10"
        title={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
      >
        {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </div>
  </div>
);

export default LayoutSidebar;
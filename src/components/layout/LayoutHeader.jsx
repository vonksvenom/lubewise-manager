import { Menu } from "lucide-react";
import CompanyLocationFilter from "./CompanyLocationFilter";

const LayoutHeader = ({ 
  sidebarOpen, 
  setSidebarOpen,
  isAdmin,
  isPowerUser,
  userCompany,
  userLocation,
  sidebarPinned,
  sidebarCollapsed
}) => (
  <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
    <div className={`flex items-center justify-between px-4 h-16 transition-all duration-200 ${
      sidebarPinned ? (sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64') : 'ml-0'
    }`}>
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-accent rounded-xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="text-foreground h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight relative group">
          <div className="relative z-10 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
            <span className="font-black tracking-tighter text-3xl">Lubri</span>
            <span className="font-light tracking-wide text-3xl">Tracker</span>
            <span className="absolute -top-1 -right-3 text-[0.6rem] text-primary/70">™</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 rounded-lg transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {!isAdmin && !isPowerUser && userCompany && userLocation && (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">{userCompany.name}</span> - {userLocation.name}
          </div>
        )}
        {(isAdmin || isPowerUser) && (
          <div className="hidden sm:block">
            <CompanyLocationFilter />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default LayoutHeader;
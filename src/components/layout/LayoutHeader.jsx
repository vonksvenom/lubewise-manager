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
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-foreground font-mono">
          <span className="text-primary">Lubri</span>
          <span className="text-accent">Tracker</span>
          <span className="absolute -mt-1 ml-0.5 text-[0.6rem] text-primary opacity-70">™</span>
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
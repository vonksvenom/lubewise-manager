import { Menu } from "lucide-react";
import CompanyLocationFilter from "./CompanyLocationFilter";

const LayoutHeader = ({ 
  sidebarOpen, 
  setSidebarOpen,
  isAdmin,
  isPowerUser,
  userCompany,
  userLocation
}) => (
  <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
    <div className="flex items-center justify-between px-4 h-16">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-accent rounded-xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="text-foreground h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LubriTracker
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {!isAdmin && !isPowerUser && userCompany && userLocation && (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">{userCompany.name}</span> - {userLocation.name}
          </div>
        )}
        {(isAdmin || isPowerUser) && <CompanyLocationFilter />}
      </div>
    </div>
  </div>
);

export default LayoutHeader;
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import CompanyLocationFilter from "./CompanyLocationFilter";
import LayoutControls from "./LayoutControls";

const LayoutHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LubriTRacker
          </h1>
          {location.pathname !== "/login" && location.pathname !== "/initial-setup" && (
            <CompanyLocationFilter />
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {location.pathname !== "/login" && location.pathname !== "/initial-setup" && (
            <>
              <LayoutControls />
              <ThemeSelector />
              <Button variant="outline" onClick={logout}>
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
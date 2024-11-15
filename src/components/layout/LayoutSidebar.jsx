import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";
import SidebarNav from "./SidebarNav";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const LayoutSidebar = ({ 
  sidebarOpen, 
  sidebarPinned,
  setSidebarPinned,
  sidebarCollapsed, 
  setSidebarCollapsed, 
  logoUrl, 
  navItems,
  onLogoChange 
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isAdmin, isPowerUser } = useAuth();
  
  const handleLogoChange = (event) => {
    if (isAdmin || isPowerUser) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof onLogoChange === 'function') {
            onLogoChange(reader.result);
            setDialogOpen(false);
            toast.success("Logo atualizado com sucesso!");
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      toast.error("Apenas administradores podem alterar o logo!");
    }
  };

  const LogoComponent = () => {
    const imgProps = {
      src: logoUrl,
      alt: "Company Logo",
      className: `${sidebarCollapsed ? 'h-12 w-12 object-contain' : 'h-14'} transition-all duration-200`,
      onError: (e) => {
        e.target.src = "/placeholder.svg";
        toast.error("Erro ao carregar o logo");
      }
    };

    if (isAdmin || isPowerUser) {
      return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div className="p-3 flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity">
              <img {...imgProps} />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar Logo da Empresa</DialogTitle>
            </DialogHeader>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="mt-4"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <div className="p-3 flex justify-center items-center">
        <img {...imgProps} />
      </div>
    );
  };

  return (
    <>
      {/* Área sensível ao hover na borda esquerda */}
      <div 
        className={`fixed inset-y-0 left-0 w-1 z-50 ${sidebarPinned ? 'hidden' : ''}`}
        onMouseEnter={() => !sidebarPinned && setIsHovered(true)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-gradient-to-br from-muted to-accent/10 backdrop-blur-sm shadow-neo-xl transform transition-all duration-200 ease-in-out ${
          sidebarOpen || isHovered || sidebarPinned ? "translate-x-0" : "-translate-x-full"
        } rounded-r-2xl`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full pt-12 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarPinned(!sidebarPinned)}
            className="absolute right-2 top-2 z-50"
          >
            {sidebarPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </Button>

          <LogoComponent />
          
          <SidebarNav 
            navItems={navItems} 
            sidebarCollapsed={sidebarCollapsed} 
          />

          <div className="mt-auto p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center text-xs sm:text-sm md:text-base"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSidebar;
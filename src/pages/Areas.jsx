import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { areaService } from "@/services/areaService";
import AreaList from "@/components/areas/AreaList";
import AreaForm from "@/components/areas/AreaForm";

const Areas = () => {
  const { isAdmin, isPowerUser } = useAuth();
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setAreas(areaService.getAll());
  }, []);

  const handleSave = (data) => {
    if (selectedArea) {
      areaService.update(selectedArea.id, data);
      toast.success("Área atualizada com sucesso");
    } else {
      areaService.add(data);
      toast.success("Área adicionada com sucesso");
    }
    setAreas(areaService.getAll());
    setSelectedArea(null);
    setDialogOpen(false);
  };

  const handleView = (area) => {
    setSelectedArea(area);
    setIsViewMode(true);
    setDialogOpen(true);
  };

  const handleEdit = (area) => {
    if (!isAdmin && !isPowerUser) {
      toast.error("Apenas administradores e power users podem editar áreas");
      return;
    }
    setSelectedArea(area);
    setIsViewMode(false);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Áreas</h1>
        {(isAdmin || isPowerUser) && (
          <Button onClick={() => {
            setSelectedArea(null);
            setIsViewMode(false);
            setDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Área
          </Button>
        )}
      </div>

      <Card className="p-6">
        <AreaList
          areas={areas}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onView={handleView}
          onEdit={handleEdit}
          isAdmin={isAdmin}
          isPowerUser={isPowerUser}
        />
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isViewMode 
                ? "Visualizar Área" 
                : selectedArea 
                  ? "Editar Área" 
                  : "Nova Área"}
            </DialogTitle>
          </DialogHeader>
          <AreaForm
            selectedArea={selectedArea}
            isViewMode={isViewMode}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Areas;
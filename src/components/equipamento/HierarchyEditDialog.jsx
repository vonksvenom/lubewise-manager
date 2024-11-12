import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import HierarchyItem from "./HierarchyItem";
import { toast } from "sonner";

const HierarchyEditDialog = ({ equipamento, open, onOpenChange, onUpdate }) => {
  const [hierarchyData, setHierarchyData] = useState(equipamento);

  const handleUpdate = (updatedData) => {
    setHierarchyData(updatedData);
  };

  const handleSave = () => {
    onUpdate(hierarchyData);
    toast.success("Hierarquia salva com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Editar Hierarquia: {equipamento.nome}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          <HierarchyItem
            item={hierarchyData}
            onUpdate={handleUpdate}
            onDelete={() => {}}
          />
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Hierarquia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HierarchyEditDialog;
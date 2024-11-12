import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import HierarchyItem from "./HierarchyItem";

const HierarchyEditDialog = ({ equipamento, open, onOpenChange, onUpdate }) => {
  const [hierarchyData, setHierarchyData] = useState(equipamento);

  const handleUpdate = (updatedData) => {
    setHierarchyData(updatedData);
    onUpdate(updatedData);
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
      </DialogContent>
    </Dialog>
  );
};

export default HierarchyEditDialog;
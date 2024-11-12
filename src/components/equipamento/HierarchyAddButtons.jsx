import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HierarchyAddButtons = ({ depth, onAdd }) => {
  return (
    <div className="flex gap-2 mt-2">
      {depth === 0 && (
        <Button variant="outline" size="sm" onClick={() => onAdd("sistema")}>
          <Plus className="h-4 w-4 mr-1" /> Sistema
        </Button>
      )}
      {depth <= 1 && (
        <Button variant="outline" size="sm" onClick={() => onAdd("conjunto")}>
          <Plus className="h-4 w-4 mr-1" /> Conjunto
        </Button>
      )}
      {depth <= 2 && (
        <Button variant="outline" size="sm" onClick={() => onAdd("subconjunto")}>
          <Plus className="h-4 w-4 mr-1" /> Subconjunto
        </Button>
      )}
      {depth <= 3 && (
        <Button variant="outline" size="sm" onClick={() => onAdd("componente")}>
          <Plus className="h-4 w-4 mr-1" /> Componente
        </Button>
      )}
    </div>
  );
};

export default HierarchyAddButtons;
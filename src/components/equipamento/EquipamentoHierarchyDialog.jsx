import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const HierarchyItem = ({ item, depth = 0 }) => {
  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <span className="font-medium">{item.nome}</span>
        <span className="text-sm text-muted-foreground">({item.tag})</span>
        {item.critico && (
          <span className="text-red-500 text-sm">(Crítico)</span>
        )}
      </div>
      {item.sistemas?.map((sistema, index) => (
        <HierarchyItem key={index} item={sistema} depth={depth + 1} />
      ))}
      {item.conjuntos?.map((conjunto, index) => (
        <HierarchyItem key={index} item={conjunto} depth={depth + 1} />
      ))}
      {item.subconjuntos?.map((subconjunto, index) => (
        <HierarchyItem key={index} item={subconjunto} depth={depth + 1} />
      ))}
      {item.componentes?.map((componente, index) => (
        <HierarchyItem key={index} item={componente} depth={depth + 1} />
      ))}
    </div>
  );
};

const EquipamentoHierarchyDialog = ({ equipamento, open, onOpenChange }) => {
  if (!equipamento) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Hierarquia do Equipamento: {equipamento.nome}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          <HierarchyItem item={equipamento} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EquipamentoHierarchyDialog;
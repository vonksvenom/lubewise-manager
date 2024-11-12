import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HierarchyItem = ({ item, depth = 0, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(item);

  const handleSave = () => {
    if (!editData.nome || !editData.tag) {
      toast.error("Nome e TAG são obrigatórios");
      return;
    }
    onUpdate(editData);
    setIsEditing(false);
    toast.success("Item atualizado com sucesso!");
  };

  if (isEditing) {
    return (
      <div className="space-y-2 border p-4 rounded-lg" style={{ marginLeft: `${depth * 24}px` }}>
        <Input
          placeholder="Nome"
          value={editData.nome}
          onChange={(e) => setEditData(prev => ({ ...prev, nome: e.target.value }))}
        />
        <Input
          placeholder="TAG"
          value={editData.tag}
          onChange={(e) => setEditData(prev => ({ ...prev, tag: e.target.value }))}
        />
        <Textarea
          placeholder="Descrição detalhada"
          value={editData.descricao || ""}
          onChange={(e) => setEditData(prev => ({ ...prev, descricao: e.target.value }))}
        />
        <div className="flex gap-2">
          <Button onClick={handleSave}>Salvar</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
        style={{ marginLeft: `${depth * 24}px` }}
      >
        {(item.sistemas?.length > 0 || item.conjuntos?.length > 0 || item.subconjuntos?.length > 0 || item.componentes?.length > 0) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        <div className="flex-1">
          <div className="font-medium">{item.nome}</div>
          <div className="text-sm text-muted-foreground">TAG: {item.tag}</div>
          {item.descricao && (
            <div className="text-sm text-muted-foreground">{item.descricao}</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(item)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <>
          {item.sistemas?.map((sistema, index) => (
            <HierarchyItem
              key={index}
              item={sistema}
              depth={depth + 1}
              onUpdate={(updated) => {
                const newSistemas = [...item.sistemas];
                newSistemas[index] = updated;
                onUpdate({ ...item, sistemas: newSistemas });
              }}
              onDelete={() => {
                const newSistemas = item.sistemas.filter((_, i) => i !== index);
                onUpdate({ ...item, sistemas: newSistemas });
              }}
            />
          ))}
          {item.conjuntos?.map((conjunto, index) => (
            <HierarchyItem
              key={index}
              item={conjunto}
              depth={depth + 1}
              onUpdate={(updated) => {
                const newConjuntos = [...item.conjuntos];
                newConjuntos[index] = updated;
                onUpdate({ ...item, conjuntos: newConjuntos });
              }}
              onDelete={() => {
                const newConjuntos = item.conjuntos.filter((_, i) => i !== index);
                onUpdate({ ...item, conjuntos: newConjuntos });
              }}
            />
          ))}
          {item.subconjuntos?.map((subconjunto, index) => (
            <HierarchyItem
              key={index}
              item={subconjunto}
              depth={depth + 1}
              onUpdate={(updated) => {
                const newSubconjuntos = [...item.subconjuntos];
                newSubconjuntos[index] = updated;
                onUpdate({ ...item, subconjuntos: newSubconjuntos });
              }}
              onDelete={() => {
                const newSubconjuntos = item.subconjuntos.filter((_, i) => i !== index);
                onUpdate({ ...item, subconjuntos: newSubconjuntos });
              }}
            />
          ))}
          {item.componentes?.map((componente, index) => (
            <HierarchyItem
              key={index}
              item={componente}
              depth={depth + 1}
              onUpdate={(updated) => {
                const newComponentes = [...item.componentes];
                newComponentes[index] = updated;
                onUpdate({ ...item, componentes: newComponentes });
              }}
              onDelete={() => {
                const newComponentes = item.componentes.filter((_, i) => i !== index);
                onUpdate({ ...item, componentes: newComponentes });
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

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
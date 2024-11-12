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
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemType, setNewItemType] = useState(null);

  const handleSave = () => {
    if (!editData.nome || !editData.tag) {
      toast.error("Nome e TAG são obrigatórios");
      return;
    }
    onUpdate(editData);
    setIsEditing(false);
    toast.success("Item atualizado com sucesso!");
  };

  const getNewItemTemplate = (type) => ({
    id: Date.now().toString(),
    nome: "",
    tag: "",
    descricao: "",
    area: item.area,
    critico: item.critico
  });

  const handleAddNew = (type) => {
    setNewItemType(type);
    setIsAddingNew(true);
    setIsExpanded(true);
  };

  const handleSaveNew = (type, newData) => {
    if (!newData.nome || !newData.tag) {
      toast.error("Nome e TAG são obrigatórios");
      return;
    }

    const updatedItem = { ...item };
    switch (type) {
      case "sistema":
        updatedItem.sistemas = [...(updatedItem.sistemas || []), newData];
        break;
      case "conjunto":
        updatedItem.conjuntos = [...(updatedItem.conjuntos || []), newData];
        break;
      case "subconjunto":
        updatedItem.subconjuntos = [...(updatedItem.subconjuntos || []), newData];
        break;
      case "componente":
        updatedItem.componentes = [...(updatedItem.componentes || []), newData];
        break;
    }

    onUpdate(updatedItem);
    setIsAddingNew(false);
    setNewItemType(null);
    toast.success(`Novo ${type} adicionado com sucesso!`);
  };

  const renderAddButtons = () => (
    <div className="flex gap-2 mt-2">
      {depth === 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddNew("sistema")}
        >
          <Plus className="h-4 w-4 mr-1" /> Sistema
        </Button>
      )}
      {depth <= 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddNew("conjunto")}
        >
          <Plus className="h-4 w-4 mr-1" /> Conjunto
        </Button>
      )}
      {depth <= 2 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddNew("subconjunto")}
        >
          <Plus className="h-4 w-4 mr-1" /> Subconjunto
        </Button>
      )}
      {depth <= 3 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddNew("componente")}
        >
          <Plus className="h-4 w-4 mr-1" /> Componente
        </Button>
      )}
    </div>
  );

  if (isEditing || isAddingNew) {
    const currentData = isAddingNew ? getNewItemTemplate(newItemType) : editData;
    const handleCurrentSave = isAddingNew 
      ? () => handleSaveNew(newItemType, currentData)
      : handleSave;

    return (
      <div className="space-y-2 border p-4 rounded-lg" style={{ marginLeft: `${depth * 24}px` }}>
        <Input
          placeholder="Nome"
          value={currentData.nome}
          onChange={(e) => setEditData(prev => ({ ...prev, nome: e.target.value }))}
        />
        <Input
          placeholder="TAG"
          value={currentData.tag}
          onChange={(e) => setEditData(prev => ({ ...prev, tag: e.target.value }))}
        />
        <Textarea
          placeholder="Descrição detalhada"
          value={currentData.descricao || ""}
          onChange={(e) => setEditData(prev => ({ ...prev, descricao: e.target.value }))}
        />
        <div className="flex gap-2">
          <Button onClick={handleCurrentSave}>Salvar</Button>
          <Button 
            variant="outline" 
            onClick={() => {
              if (isAddingNew) {
                setIsAddingNew(false);
                setNewItemType(null);
              } else {
                setIsEditing(false);
              }
            }}
          >
            Cancelar
          </Button>
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
          {depth > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {renderAddButtons()}

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
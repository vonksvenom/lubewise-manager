import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const SubequipamentoRow = ({ item, depth = 1, onView, type = "sistema" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getChildItems = () => {
    switch (type) {
      case "sistema":
        return item.conjuntos || [];
      case "conjunto":
        return item.subconjuntos || [];
      case "subconjunto":
        return item.componentes || [];
      default:
        return [];
    }
  };

  const getNextType = () => {
    switch (type) {
      case "sistema":
        return "conjunto";
      case "conjunto":
        return "subconjunto";
      case "subconjunto":
        return "componente";
      default:
        return null;
    }
  };

  const childItems = getChildItems();
  const hasChildren = childItems.length > 0;
  const nextType = getNextType();

  return (
    <>
      <TableRow className="bg-muted/20">
        <TableCell>
          {item.imagem && (
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-12 h-12 object-cover rounded-md"
            />
          )}
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center">
            <div style={{ width: `${depth * 24}px` }} />
            {hasChildren && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 mr-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            <span>{item.nome}</span>
          </div>
        </TableCell>
        <TableCell>{item.tag}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(item)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded &&
        childItems.map((child) => (
          <SubequipamentoRow
            key={child.id}
            item={child}
            depth={depth + 1}
            onView={onView}
            type={nextType}
          />
        ))}
    </>
  );
};

export default SubequipamentoRow;
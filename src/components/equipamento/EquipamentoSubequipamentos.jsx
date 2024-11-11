import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const EquipamentoSubequipamentos = ({ subequipamentos = [], onAdd, onRemove }) => {
  const [novoSubequipamento, setNovoSubequipamento] = useState({
    nome: "",
    tag: "",
    tipo: "",
  });

  const handleAdd = () => {
    if (novoSubequipamento.nome && novoSubequipamento.tag) {
      onAdd(novoSubequipamento);
      setNovoSubequipamento({ nome: "", tag: "", tipo: "" });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subequipamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subequipamentos.map((sub, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                <div className="flex-1">
                  <p className="font-medium">{sub.nome}</p>
                  <p className="text-sm text-gray-500">TAG: {sub.tag}</p>
                  {sub.tipo && <p className="text-sm text-gray-500">Tipo: {sub.tipo}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Nome do subequipamento"
                value={novoSubequipamento.nome}
                onChange={(e) =>
                  setNovoSubequipamento((prev) => ({
                    ...prev,
                    nome: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="TAG"
                value={novoSubequipamento.tag}
                onChange={(e) =>
                  setNovoSubequipamento((prev) => ({
                    ...prev,
                    tag: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Tipo (opcional)"
                value={novoSubequipamento.tipo}
                onChange={(e) =>
                  setNovoSubequipamento((prev) => ({
                    ...prev,
                    tipo: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAdd}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Subequipamento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipamentoSubequipamentos;
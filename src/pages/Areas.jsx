import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";
import { areaService } from "@/services/areaService";

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

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      responsavel: formData.get("responsavel"),
    };

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

  const filteredAreas = areas.filter(
    (area) =>
      area.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="mb-4">
          <Input
            placeholder="Buscar áreas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAreas.map((area) => (
              <TableRow key={area.id}>
                <TableCell>
                  <button
                    onClick={() => handleView(area)}
                    className="hover:underline text-left"
                  >
                    {area.nome}
                  </button>
                </TableCell>
                <TableCell>{area.descricao}</TableCell>
                <TableCell>{area.responsavel}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(area)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {(isAdmin || isPowerUser) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(area)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium">
                Nome da Área
              </label>
              <Input
                id="nome"
                name="nome"
                defaultValue={selectedArea?.nome}
                required
                readOnly={isViewMode}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">
                Descrição
              </label>
              <Input
                id="descricao"
                name="descricao"
                defaultValue={selectedArea?.descricao}
                required
                readOnly={isViewMode}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="responsavel" className="text-sm font-medium">
                Responsável
              </label>
              <Input
                id="responsavel"
                name="responsavel"
                defaultValue={selectedArea?.responsavel}
                required
                readOnly={isViewMode}
              />
            </div>
            {!isViewMode && <Button type="submit">Salvar</Button>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Areas;
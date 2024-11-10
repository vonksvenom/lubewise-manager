import { useState, useEffect } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { areaService } from "@/services/areaService";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const { toast } = useToast();

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
      toast({
        title: "Área atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      areaService.add(data);
      toast({
        title: "Área adicionada",
        description: "A nova área foi cadastrada com sucesso.",
      });
    }
    setAreas(areaService.getAll());
    setSelectedArea(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta área?")) {
      areaService.delete(id);
      setAreas(areaService.getAll());
      toast({
        title: "Área excluída",
        description: "A área foi removida com sucesso.",
      });
    }
  };

  const filteredAreas = areas.filter(
    (area) =>
      area.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Áreas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedArea(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Área
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedArea ? "Editar Área" : "Nova Área"}
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
                />
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>
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
                <TableCell>{area.nome}</TableCell>
                <TableCell>{area.descricao}</TableCell>
                <TableCell>{area.responsavel}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedArea(area)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(area.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Areas;
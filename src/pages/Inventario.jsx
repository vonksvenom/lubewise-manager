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
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InventoryChart } from "@/components/InventoryChart";
import { inventarioService } from "@/services/dataService";
import { format } from "date-fns";

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setItems(inventarioService.getAll());
  }, []);

  const handleAddItem = (newItem) => {
    inventarioService.add(newItem);
    setItems(inventarioService.getAll());
    toast({
      title: "Item adicionado",
      description: "O item foi adicionado ao inventário com sucesso.",
    });
  };

  const handleUpdateItem = (id, quantity) => {
    inventarioService.update(id, { quantity });
    setItems(inventarioService.getAll());
    toast({
      title: "Inventário atualizado",
      description: "A quantidade foi atualizada com sucesso.",
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Inventário</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Item ao Inventário</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddItem({
                  name: formData.get("name"),
                  type: formData.get("type"),
                  quantity: Number(formData.get("quantity")),
                  unit: formData.get("unit"),
                });
              }}
              className="space-y-4"
            >
              <Input name="name" placeholder="Nome do item" required />
              <Input name="type" placeholder="Tipo (Óleo/Graxa)" required />
              <Input
                name="quantity"
                type="number"
                placeholder="Quantidade"
                required
              />
              <Input name="unit" placeholder="Unidade (L/Kg)" required />
              <Button type="submit">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Data Registro</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  {format(new Date(item.dataRegistro), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newQuantity = prompt(
                        "Digite a nova quantidade:",
                        item.quantity
                      );
                      if (newQuantity !== null) {
                        handleUpdateItem(item.id, Number(newQuantity));
                      }
                    }}
                  >
                    Atualizar Quantidade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-catYellow">
            Previsão de Consumo
          </h2>
          <InventoryChart />
        </div>
      </Card>
    </div>
  );
};

export default Inventario;
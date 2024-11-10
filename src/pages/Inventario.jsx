import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import InventarioSummary from "@/components/InventarioSummary";
import InventarioHistory from "@/components/InventarioHistory";
import InventarioTable from "@/components/InventarioTable";
import { inventarioService, areaService } from "@/services/dataService";
import BulkImportDialog from "@/components/common/BulkImportDialog";

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const areas = areaService.getAll();

  const handleSave = (data) => {
    inventarioService.add(data);
    toast({
      title: "Item adicionado",
      description: "O item foi adicionado ao inventário com sucesso.",
    });
  };

  const templateData = [
    {
      name: "Exemplo Item",
      type: "Óleo",
      quantity: 100,
      unit: "L",
      location: "Almoxarifado Central",
      area: "Produção"
    }
  ];

  const handleImport = (data) => {
    data.forEach(item => {
      inventarioService.add(item);
    });
    toast({
      title: "Importação concluída",
      description: `${data.length} itens foram importados com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-catYellow">Inventário</h1>
        <div className="flex gap-2">
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
                  handleSave({
                    name: formData.get("name"),
                    type: formData.get("type"),
                    quantity: Number(formData.get("quantity")),
                    unit: formData.get("unit"),
                    location: formData.get("location"),
                    area: formData.get("area"),
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
                <Input
                  name="location"
                  placeholder="Local de Armazenamento"
                  required
                />
                <select
                  name="area"
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Selecione a área</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.nome}>
                      {area.nome}
                    </option>
                  ))}
                </select>
                <Button type="submit">Salvar</Button>
              </form>
            </DialogContent>
          </Dialog>
          <BulkImportDialog
            title="Importar Itens"
            onImport={handleImport}
            templateData={templateData}
            templateFilename="template_inventario.xlsx"
          />
        </div>
      </div>

      <InventarioSummary />

      <Card className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <InventarioTable searchTerm={searchTerm} />
      </Card>

      <InventarioHistory />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-catYellow">
          Previsão de Consumo
        </h2>
        <InventoryChart />
      </div>
    </div>
  );
};

export default Inventario;

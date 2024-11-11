import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventarioService, areaService } from "@/services/dataService";

export const InventarioSummary = () => {
  const [selectedArea, setSelectedArea] = useState("todas");
  const [viewMode, setViewMode] = useState("tipo");
  const [areas, setAreas] = useState([]);
  const [summary, setSummary] = useState({
    items: []
  });

  useEffect(() => {
    const loadData = () => {
      setAreas(areaService.getAll());
      const inventory = inventarioService.getAll();
      const area = selectedArea === "todas" ? null : selectedArea;
      
      if (viewMode === "tipo") {
        const totals = inventory.reduce((acc, item) => {
          if (!area || item.area === area) {
            if (item.type.toLowerCase().includes('óleo')) {
              acc.oleo = (acc.oleo || 0) + item.quantity;
            } else if (item.type.toLowerCase().includes('graxa')) {
              acc.graxa = (acc.graxa || 0) + item.quantity;
            }
          }
          return acc;
        }, {});

        setSummary({
          items: [
            { name: "Óleo", quantity: totals.oleo || 0, unit: "L" },
            { name: "Graxa", quantity: totals.graxa || 0, unit: "Kg" }
          ]
        });
      } else {
        // Group by commercial name when viewMode is "descricao"
        const totals = inventory.reduce((acc, item) => {
          if (!area || item.area === area) {
            const key = item.commercialName || item.name;
            if (!acc[key]) {
              acc[key] = {
                name: key,
                quantity: 0,
                unit: item.unit
              };
            }
            acc[key].quantity += item.quantity;
          }
          return acc;
        }, {});

        setSummary({
          items: Object.values(totals)
        });
      }
    };

    loadData();
  }, [selectedArea, viewMode]);

  return (
    <Card className="p-6 shadow-neo bg-gradient-to-br from-muted to-accent/10 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-catYellow">
          Sumário do Inventário
        </h2>
        <div className="flex gap-2">
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-[200px] shadow-neo">
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as áreas</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.nome}>
                  {area.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[200px] shadow-neo">
              <SelectValue placeholder="Modo de visualização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tipo">Por Tipo</SelectItem>
              <SelectItem value="descricao">Por Descrição</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{viewMode === "tipo" ? "Tipo" : "Descrição"}</TableHead>
            <TableHead>Quantidade Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity} {item.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default InventarioSummary;
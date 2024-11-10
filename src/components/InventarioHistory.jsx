import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown } from "lucide-react";
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
import { format } from "date-fns";
import * as XLSX from 'xlsx';
import { useToast } from "@/components/ui/use-toast";

const InventarioHistory = () => {
  const [selectedArea, setSelectedArea] = useState("todas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [history, setHistory] = useState([]);
  const areas = areaService.getAll();
  const { toast } = useToast();

  const handleSearch = () => {
    const area = selectedArea === "todas" ? null : selectedArea;
    const historico = inventarioService.getHistoricoByPeriod(
      new Date(startDate),
      new Date(endDate),
      area
    );
    setHistory(historico);
  };

  const handleExport = () => {
    if (history.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Realize uma busca primeiro para exportar os dados.",
        variant: "destructive",
      });
      return;
    }

    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Histórico");
    XLSX.writeFile(wb, `historico_${startDate}_${endDate}.xlsx`);
    
    toast({
      title: "Exportação concluída",
      description: "O histórico foi exportado com sucesso.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-catYellow mb-4">
        Histórico de Movimentações
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium">Área</label>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger>
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
        </div>
        <div>
          <label className="text-sm font-medium">Data Inicial</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Data Final</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={handleSearch}>Buscar</Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <FileDown className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Operação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.historicoId}>
              <TableCell>
                {format(new Date(item.dataRegistro), "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell>{item.area}</TableCell>
              <TableCell>{item.tipoOperacao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default InventarioHistory;
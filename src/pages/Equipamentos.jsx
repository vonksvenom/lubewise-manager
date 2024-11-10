import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const equipamentosMock = [
  {
    id: 1,
    nome: "Torno CNC",
    modelo: "TCN-2000",
    status: "Operacional",
    ultimaManutencao: "2024-03-15",
    proximaManutencao: "2024-04-15",
  },
  {
    id: 2,
    nome: "Fresadora",
    modelo: "FR-500",
    status: "Em Manutenção",
    ultimaManutencao: "2024-03-10",
    proximaManutencao: "2024-04-10",
  },
  {
    id: 3,
    nome: "Prensa Hidráulica",
    modelo: "PH-100",
    status: "Operacional",
    ultimaManutencao: "2024-03-05",
    proximaManutencao: "2024-04-05",
  },
];

const Equipamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipamentos</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Equipamento
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Manutenção</TableHead>
                <TableHead>Próxima Manutenção</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipamentosMock.map((equip) => (
                <TableRow key={equip.id}>
                  <TableCell className="font-medium">{equip.nome}</TableCell>
                  <TableCell>{equip.modelo}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        equip.status === "Operacional"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {equip.status}
                    </span>
                  </TableCell>
                  <TableCell>{equip.ultimaManutencao}</TableCell>
                  <TableCell>{equip.proximaManutencao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Equipamentos;
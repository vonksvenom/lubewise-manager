import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Eye } from "lucide-react";
import { useSortableTable } from "@/hooks/useSortableTable";
import SortableHeader from "@/components/common/SortableHeader";

const AreaList = ({ 
  areas, 
  searchTerm, 
  onSearchChange, 
  onView, 
  onEdit, 
  isAdmin, 
  isPowerUser 
}) => {
  const { sortConfig, sortData, getSortedData } = useSortableTable();

  const filteredAreas = areas.filter(
    (area) =>
      area.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAreas = getSortedData(filteredAreas);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar áreas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader 
              label="Nome"
              sortKey="nome"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <SortableHeader 
              label="Descrição"
              sortKey="descricao"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <SortableHeader 
              label="Responsável"
              sortKey="responsavel"
              sortConfig={sortConfig}
              onSort={sortData}
            />
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAreas.map((area) => (
            <TableRow key={area.id}>
              <TableCell>
                <button
                  onClick={() => onView(area)}
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
                    onClick={() => onView(area)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {(isAdmin || isPowerUser) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(area)}
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
    </div>
  );
};

export default AreaList;

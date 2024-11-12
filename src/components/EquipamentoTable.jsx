import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import EquipamentoViewDialog from "./equipamento/EquipamentoViewDialog";
import { useSortableTable } from "@/hooks/useSortableTable";
import SortableHeader from "@/components/common/SortableHeader";
import SubequipamentoRow from "./equipamento/SubequipamentoRow";
import EquipamentoActions from "./equipamento/EquipamentoActions";

const EquipamentoTable = ({ equipamentos, onEdit, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { sortConfig, sortData, getSortedData } = useSortableTable();

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleView = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setViewDialogOpen(true);
  };

  const sortedEquipamentos = getSortedData(equipamentos);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <SortableHeader 
                label="Nome"
                sortKey="nome"
                sortConfig={sortConfig}
                onSort={sortData}
              />
              <SortableHeader 
                label="TAG"
                sortKey="tag"
                sortConfig={sortConfig}
                onSort={sortData}
              />
              <SortableHeader 
                label="Status"
                sortKey="status"
                sortConfig={sortConfig}
                onSort={sortData}
              />
              <SortableHeader 
                label="Última Manutenção"
                sortKey="ultimaManutencao"
                sortConfig={sortConfig}
                onSort={sortData}
              />
              <SortableHeader 
                label="Próxima Manutenção"
                sortKey="proximaManutencao"
                sortConfig={sortConfig}
                onSort={sortData}
              />
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEquipamentos.map((equip) => (
              <>
                <TableRow 
                  key={equip.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleView(equip)}
                >
                  <TableCell>
                    {equip.imagem && (
                      <img
                        src={equip.imagem}
                        alt={equip.nome}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {equip.subequipamentos?.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 expand-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(equip.id);
                          }}
                        >
                          {expandedRows[equip.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      {equip.nome}
                      {equip.critico && (
                        <span className="text-red-500 text-sm font-medium ml-2">
                          (Crítico)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{equip.tag}</TableCell>
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
                  <EquipamentoActions 
                    equipamento={equip}
                    onView={handleView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableRow>
                {expandedRows[equip.id] &&
                  equip.subequipamentos?.map((sub, index) => (
                    <SubequipamentoRow
                      key={`${equip.id}-${index}`}
                      subequipamento={sub}
                      onView={handleView}
                    />
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <EquipamentoViewDialog
        equipamento={selectedEquipamento}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </>
  );
};

export default EquipamentoTable;
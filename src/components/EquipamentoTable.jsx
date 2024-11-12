import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronRight, ChevronDown, Eye } from "lucide-react";
import { useState } from "react";
import QRCodeDisplay from "./common/QRCodeDisplay";
import EquipamentoViewDialog from "./equipamento/EquipamentoViewDialog";

const SubequipamentoRow = ({ subequipamento, depth = 1, onView }) => (
  <TableRow className={`bg-muted/20`}>
    <TableCell style={{ paddingLeft: `${depth * 2}rem` }}>
      {subequipamento.imagem && (
        <img
          src={subequipamento.imagem}
          alt={subequipamento.nome}
          className="w-12 h-12 object-cover rounded-md"
        />
      )}
    </TableCell>
    <TableCell className="font-medium">
      <button
        onClick={() => onView(subequipamento)}
        className="hover:underline text-left flex items-center gap-2"
      >
        <span>└─ {subequipamento.nome}</span>
      </button>
    </TableCell>
    <TableCell>{subequipamento.tag}</TableCell>
    <TableCell>{subequipamento.tipo || "-"}</TableCell>
    <TableCell>-</TableCell>
    <TableCell>-</TableCell>
    <TableCell className="text-right">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(subequipamento)}
      >
        <Eye className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
);

const EquipamentoTable = ({ equipamentos, onEdit, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>TAG</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Manutenção</TableHead>
              <TableHead>Próxima Manutenção</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentos.map((equip) => (
              <>
                <TableRow 
                  key={equip.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={(e) => {
                    // Prevent row click when clicking expand button
                    if (e.target.closest('button')?.classList.contains('expand-button')) {
                      return;
                    }
                    handleView(equip);
                  }}
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
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(equip);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(equip);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(equip.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
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
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { format, isValid, parseISO } from "date-fns";
import { RECURRENCE_OPTIONS } from "@/constants/recurrenceOptions";

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "dd/MM/yyyy") : "Data inválida";
  } catch {
    return "Data inválida";
  }
};

export const getStatusDisplay = (ordem) => {
  const now = new Date();
  
  if (!ordem.dataExecucao) {
    return {
      label: ordem.status || "Pendente",
      className: "bg-yellow-100 text-yellow-800"
    };
  }

  try {
    const dataExecucao = parseISO(ordem.dataExecucao);
    
    if (!isValid(dataExecucao)) {
      return {
        label: ordem.status || "Pendente",
        className: "bg-yellow-100 text-yellow-800"
      };
    }
    
    if (ordem.status === "Concluída") {
      return {
        label: "Concluída",
        className: "bg-green-100 text-green-800"
      };
    }
    
    if (ordem.status !== "Concluída" && dataExecucao < now) {
      return {
        label: "Atrasada",
        className: "bg-red-100 text-red-800"
      };
    }

    return {
      label: ordem.status || "Pendente",
      className: ordem.status === "Em Andamento"
        ? "bg-blue-100 text-blue-800"
        : ordem.status === "Cancelada"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800"
    };
  } catch {
    return {
      label: ordem.status || "Pendente",
      className: "bg-yellow-100 text-yellow-800"
    };
  }
};

export const ActionButtons = ({ ordem, onEdit, onDelete }) => {
  const canEdit = ordem.tipo === "Corretiva" || ordem.tipo === "Proativa";
  
  return (
    <div className="flex gap-2 justify-end">
      {canEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(ordem);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(ordem.id);
        }}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export const RecurrenceCell = ({ recorrencia }) => (
  <TableCell>
    {recorrencia === "none" ? "Sem recorrência" : 
      RECURRENCE_OPTIONS.find(opt => opt.value === recorrencia)?.label}
  </TableCell>
);
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

const ServiceOrderCard = ({ ordem, onEdit, onClick, getTecnicoNome, getStatusDisplay }) => {
  const { isAdmin, isPowerUser } = useAuth();
  const statusDisplay = getStatusDisplay(ordem);
  const isUpcoming = new Date(ordem.dataInicio) > new Date();

  return (
    <div
      onClick={() => onClick(ordem)}
      className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-accent/5 transition-colors relative"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{ordem.titulo}</h3>
          <p className="text-sm text-muted-foreground">
            {ordem.descricao}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-sm ${statusDisplay.className}`}>
            {statusDisplay.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Data Início:</span>{" "}
          {format(new Date(ordem.dataInicio), "dd/MM/yyyy")}
        </div>
        <div>
          <span className="font-medium">Data Fim:</span>{" "}
          {format(new Date(ordem.dataFim), "dd/MM/yyyy")}
        </div>
        <div>
          <span className="font-medium">Tipo:</span>{" "}
          <span className={`px-2 py-1 rounded-full text-xs ${
            ordem.tipo === "Preventiva"
              ? "bg-blue-100 text-blue-800"
              : ordem.tipo === "Corretiva"
              ? "bg-orange-100 text-orange-800"
              : "bg-purple-100 text-purple-800"
          }`}>
            {ordem.tipo}
          </span>
        </div>
        <div>
          <span className="font-medium">
            {isUpcoming ? "Técnico Designado:" : "Executado por:"}
          </span>{" "}
          {getTecnicoNome(ordem.tecnicoId)}
        </div>
      </div>

      {(isAdmin || isPowerUser) && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(ordem);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ServiceOrderCard;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userService } from "@/services/dataService";

const OrdemServicoFilters = ({ filters, onFilterChange }) => {
  const tecnicos = userService.getAll().filter(u => u.role === "technician");
  
  const tipos = ["Todos", "Preventiva", "Corretiva", "Preditiva"];
  const status = ["Todos", "Pendente", "Em Andamento", "Concluída", "Cancelada", "Atrasada"];
  const prioridades = ["Todos", "Baixa", "Media", "Alta", "Urgente"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-br from-muted to-accent/10 rounded-lg shadow-neo mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Tipo
        </label>
        <Select
          value={filters.tipo || "Todos"}
          onValueChange={(value) => onFilterChange("tipo", value)}
        >
          <SelectTrigger className="w-full shadow-neo-sm">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {tipos.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Técnico
        </label>
        <Select
          value={filters.tecnicoId || "Todos"}
          onValueChange={(value) => onFilterChange("tecnicoId", value)}
        >
          <SelectTrigger className="w-full shadow-neo-sm">
            <SelectValue placeholder="Selecione o técnico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            {tecnicos.map((tecnico) => (
              <SelectItem key={tecnico.id} value={tecnico.id}>
                {tecnico.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Status
        </label>
        <Select
          value={filters.status || "Todos"}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger className="w-full shadow-neo-sm">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            {status.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Prioridade
        </label>
        <Select
          value={filters.prioridade || "Todos"}
          onValueChange={(value) => onFilterChange("prioridade", value)}
        >
          <SelectTrigger className="w-full shadow-neo-sm">
            <SelectValue placeholder="Selecione a prioridade" />
          </SelectTrigger>
          <SelectContent>
            {prioridades.map((prioridade) => (
              <SelectItem key={prioridade} value={prioridade}>
                {prioridade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrdemServicoFilters;
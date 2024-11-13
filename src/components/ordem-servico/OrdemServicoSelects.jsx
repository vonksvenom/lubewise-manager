import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrdemServicoSelects = ({ formData, handleChange, equipamentos = [], tecnicos = [] }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="tipo" className="text-sm font-medium">
          Tipo de Ordem
        </label>
        <Select
          value={formData.tipo}
          onValueChange={(value) => handleChange("tipo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Corretiva">Corretiva</SelectItem>
            <SelectItem value="Preventiva">Preventiva</SelectItem>
            <SelectItem value="Preditiva">Preditiva</SelectItem>
            <SelectItem value="Proativa">Proativa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="equipamento" className="text-sm font-medium">
          Equipamento
        </label>
        <Select
          value={formData.equipamentoId}
          onValueChange={(value) => handleChange("equipamentoId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o equipamento" />
          </SelectTrigger>
          <SelectContent>
            {equipamentos.map((equip) => (
              <SelectItem key={equip.id} value={equip.id.toString()}>
                {equip.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="tecnico" className="text-sm font-medium">
          Operacional Responsável
        </label>
        <Select
          value={formData.tecnicoId}
          onValueChange={(value) => handleChange("tecnicoId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o operacional" />
          </SelectTrigger>
          <SelectContent>
            {tecnicos.filter(t => t.role === "technician").map((tecnico) => (
              <SelectItem key={tecnico.id} value={tecnico.id}>
                {tecnico.name} ({tecnico.nivel}) - {tecnico.horasDisponiveis}h/dia
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
            <SelectItem value="Cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="prioridade" className="text-sm font-medium">
          Prioridade
        </label>
        <Select
          value={formData.prioridade}
          onValueChange={(value) => handleChange("prioridade", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Baixa">Baixa</SelectItem>
            <SelectItem value="Media">Média</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Urgente">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrdemServicoSelects;
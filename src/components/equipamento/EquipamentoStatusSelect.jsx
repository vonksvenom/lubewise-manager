import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EquipamentoStatusSelect = ({ value, onValueChange }) => (
  <div className="space-y-2">
    <label htmlFor="status" className="text-sm font-medium">Status</label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Operacional">Operacional</SelectItem>
        <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
        <SelectItem value="Inativo">Inativo</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default EquipamentoStatusSelect;
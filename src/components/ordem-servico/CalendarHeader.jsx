import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

export const CalendarHeader = ({ setBalanceamentoOpen }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Calendário</h1>
      <Button 
        variant="outline"
        onClick={() => setBalanceamentoOpen(true)}
        className="gap-2 shadow-neo hover:shadow-neo-sm transition-shadow"
      >
        <Scale className="h-4 w-4" />
        Balanceamento Automático
      </Button>
    </div>
  );
};
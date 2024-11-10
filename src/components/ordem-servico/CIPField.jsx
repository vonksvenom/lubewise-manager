import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

const CIPField = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="cip" className="text-sm font-medium">
          CIP
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>CÓDIGO DE IDENTIFICAÇÃO DO PONTO</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id="cip"
        value={value}
        onChange={onChange}
        placeholder="Digite o CIP"
      />
    </div>
  );
};

export default CIPField;
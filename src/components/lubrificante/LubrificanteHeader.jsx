import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LubrificanteForm from "./LubrificanteForm";

const LubrificanteHeader = ({
  title,
  dialogOpen,
  setDialogOpen,
  selectedLubrificante,
  setSelectedLubrificante,
  onSave,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => setSelectedLubrificante(null)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Lubrificante
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedLubrificante
                ? "Editar Lubrificante"
                : "Novo Lubrificante"}
            </DialogTitle>
          </DialogHeader>
          <LubrificanteForm
            initialData={selectedLubrificante}
            onSave={onSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LubrificanteHeader;
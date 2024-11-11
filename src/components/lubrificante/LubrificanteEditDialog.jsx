import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LubrificanteForm from "./LubrificanteForm";

const LubrificanteEditDialog = ({ isOpen, onOpenChange, lubrificante, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lubrificante</DialogTitle>
        </DialogHeader>
        <LubrificanteForm
          initialData={lubrificante}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LubrificanteEditDialog;
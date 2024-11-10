import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";

const LogoUploader = ({ isAdmin, isPowerUser, onLogoChange }) => {
  const handleLogoChange = (event) => {
    if (isAdmin() || isPowerUser()) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onLogoChange(reader.result);
          toast.success("Logo atualizado com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    } else {
      toast.error("Apenas administradores podem alterar o logo!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl bg-gradient-to-br from-muted to-accent/10"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl shadow-lg backdrop-blur-sm bg-background/95">
        <DialogHeader>
          <DialogTitle>Alterar Logo</DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="mt-4 rounded-xl"
        />
      </DialogContent>
    </Dialog>
  );
};

export default LogoUploader;
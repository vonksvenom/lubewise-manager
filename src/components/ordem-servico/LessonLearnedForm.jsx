import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LessonLearnedForm = ({ isOpen, onClose, onSave, ordemId }) => {
  const [lessonLearned, setLessonLearned] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      text: lessonLearned,
      date: new Date().toISOString(),
      ordemId,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lições Aprendidas</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Informações Adicionais / Lições Aprendidas
            </label>
            <Textarea
              value={lessonLearned}
              onChange={(e) => setLessonLearned(e.target.value)}
              placeholder="Descreva as lições aprendidas durante este serviço..."
              rows={5}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LessonLearnedForm;
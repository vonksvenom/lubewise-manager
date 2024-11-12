import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const EquipamentoLessonsLearned = ({ lessonsLearned = [] }) => {
  if (!lessonsLearned.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Lições Aprendidas</h3>
      <div className="space-y-4">
        {lessonsLearned.map((lesson, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  OS #{lesson.ordemId}
                </span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(lesson.date), "dd/MM/yyyy")}
                </span>
              </div>
              <p className="text-sm">{lesson.text}</p>
              <p className="text-xs text-muted-foreground">
                Registrado por: {lesson.userName}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipamentoLessonsLearned;
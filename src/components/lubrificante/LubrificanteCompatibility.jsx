import { Card } from "@/components/ui/card";
import { lubrificanteService } from "@/services/lubrificanteService";
import { useQuery } from "@tanstack/react-query";

const LubrificanteCompatibility = ({ codigoLIS }) => {
  const { data: lubrificantes = [] } = useQuery({
    queryKey: ['lubrificantes'],
    queryFn: lubrificanteService.getAll,
  });

  const compatibleLubricants = lubrificantes.filter(
    lub => lub.codigoLIS === codigoLIS
  );

  if (compatibleLubricants.length <= 1) return null;

  return (
    <Card className="p-4 mt-4">
      <h3 className="font-semibold mb-2">Lubrificantes Compatíveis</h3>
      <div className="space-y-2">
        {compatibleLubricants.map((lub) => (
          <div
            key={lub.id}
            className="flex items-center justify-between p-2 bg-muted rounded-lg"
          >
            <span>{lub.nomeComercial}</span>
            <span className="text-sm text-muted-foreground">
              {lub.fornecedor}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LubrificanteCompatibility;
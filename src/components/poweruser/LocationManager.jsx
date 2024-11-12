import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { locationService } from "@/services/dataService";
import { X } from "lucide-react";

const LocationManager = ({ companies }) => {
  const [locations, setLocations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [newLocation, setNewLocation] = useState({ name: "", companyId: "" });

  const loadData = () => {
    const loadedLocations = locationService.getAll();
    setLocations(loadedLocations);
  };

  useState(() => {
    loadData();
  }, []);

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.companyId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    locationService.add(newLocation);
    loadData();
    setNewLocation(prev => ({ ...prev, name: "" }));
    toast.success("Local adicionado com sucesso!");
  };

  const handleDeleteLocation = (locationId) => {
    locationService.delete(locationId);
    loadData();
    toast.success("Local removido com sucesso!");
  };

  // Filtra os locais baseado na empresa selecionada no formulário
  const filteredLocations = locations.filter(
    location => !selectedCompany || location.companyId === selectedCompany
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gerenciar Locais</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select
            value={newLocation.companyId}
            onValueChange={(value) => setNewLocation(prev => ({ ...prev, companyId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Nome do local"
            value={newLocation.name}
            onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <Button onClick={handleAddLocation}>Adicionar Local</Button>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Locais Cadastrados:</h3>
        <div className="space-y-2">
          {filteredLocations.map((location) => (
            <div key={location.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
              <div className="flex-1">
                <span>{location.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {companies.find(c => c.id === location.companyId)?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteLocation(location.id)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LocationManager;
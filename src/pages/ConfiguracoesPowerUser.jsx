import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ConfiguracoesPowerUser = () => {
  const { isAdmin, isPowerUser } = useAuth();
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [newLocation, setNewLocation] = useState({ name: "", companyId: "" });
  const [newCompany, setNewCompany] = useState({ name: "" });

  useEffect(() => {
    const loadData = () => {
      const storedLocations = JSON.parse(localStorage.getItem("locations") || "[]");
      const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
      setLocations(storedLocations);
      setCompanies(storedCompanies);
    };
    loadData();
  }, []);

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.companyId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const updatedLocations = [...locations, { 
      id: Date.now().toString(),
      ...newLocation 
    }];
    setLocations(updatedLocations);
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    setNewLocation({ name: "", companyId: "" });
    toast.success("Local adicionado com sucesso!");
  };

  const handleAddCompany = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem adicionar empresas");
      return;
    }

    if (!newCompany.name) {
      toast.error("Nome da empresa é obrigatório");
      return;
    }

    const updatedCompanies = [...companies, { 
      id: Date.now().toString(),
      ...newCompany 
    }];
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setNewCompany({ name: "" });
    toast.success("Empresa adicionada com sucesso!");
  };

  const filteredLocations = locations.filter(
    location => selectedCompany === "all" || location.companyId === selectedCompany
  );

  if (!isAdmin && !isPowerUser) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Acesso Restrito</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-catYellow">Configurações PowerUser</h1>

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
          <div className="mb-4">
            <Select
              value={selectedCompany}
              onValueChange={setSelectedCompany}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as empresas</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h3 className="font-medium mb-2">Locais Cadastrados:</h3>
          <div className="space-y-2">
            {filteredLocations.map((location) => (
              <div key={location.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                <span>{location.name}</span>
                <span className="text-sm text-muted-foreground">
                  {companies.find(c => c.id === location.companyId)?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {isAdmin && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Gerenciar Empresas</h2>
          <div className="space-y-4">
            <Input
              placeholder="Nome da empresa"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ name: e.target.value })}
            />
            <Button onClick={handleAddCompany}>Adicionar Empresa</Button>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Empresas Cadastradas:</h3>
            <div className="space-y-2">
              {companies.map((company) => (
                <div key={company.id} className="p-2 bg-muted rounded-lg">
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConfiguracoesPowerUser;
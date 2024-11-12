import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";
import { companyService } from "@/services/dataService";

export const CompanyManagement = () => {
  const [companies, setCompanies] = useState(companyService.getAll());
  const [newCompany, setNewCompany] = useState({ name: "" });

  const handleAddCompany = () => {
    if (!newCompany.name) {
      toast.error("Nome da empresa é obrigatório");
      return;
    }

    companyService.add(newCompany);
    setCompanies(companyService.getAll());
    setNewCompany({ name: "" });
    toast.success("Empresa adicionada com sucesso!");
  };

  const handleDeleteCompany = (companyId) => {
    companyService.delete(companyId);
    setCompanies(companyService.getAll());
    toast.success("Empresa removida com sucesso!");
  };

  return (
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
            <div key={company.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
              <span>{company.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteCompany(company.id)}
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
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { companyService } from "@/services/dataService";
import LocationManager from "@/components/poweruser/LocationManager";
import CompanyManager from "@/components/poweruser/CompanyManager";

const ConfiguracoesPowerUser = () => {
  const { isAdmin, isPowerUser } = useAuth();
  const [companies, setCompanies] = useState([]);

  const loadCompanies = () => {
    const loadedCompanies = companyService.getAll();
    setCompanies(loadedCompanies);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

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
      <LocationManager companies={companies} />
      {isAdmin && <CompanyManager isAdmin={isAdmin} companies={companies} onCompaniesChange={loadCompanies} />}
    </div>
  );
};

export default ConfiguracoesPowerUser;
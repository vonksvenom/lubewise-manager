import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { companyService, locationService } from "@/services/dataService";
import LocationManager from "@/components/poweruser/LocationManager";
import CompanyManager from "@/components/poweruser/CompanyManager";

const ConfiguracoesPowerUser = () => {
  const { isAdmin, isPowerUser } = useAuth();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    companyService.init();
    locationService.init();
    setCompanies(companyService.getAll());
  };

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

      <LocationManager companies={companies} loadData={loadData} />

      {isAdmin && <CompanyManager isAdmin={isAdmin} loadData={loadData} />}
    </div>
  );
};

export default ConfiguracoesPowerUser;
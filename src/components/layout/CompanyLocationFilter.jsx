import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { companyService } from "@/services/dataService";

const CompanyLocationFilter = () => {
  const { user, isAdmin, isPowerUser } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const loadCompanies = () => {
      let availableCompanies = companyService.getAll();
      if (!isAdmin && user?.companyId) {
        availableCompanies = availableCompanies.filter(
          (company) => company.id === user.companyId
        );
      }
      setCompanies(availableCompanies);

      // Set default company if user has one assigned
      if (user?.companyId && !selectedCompany) {
        setSelectedCompany(user.companyId);
      }
    };

    loadCompanies();
  }, [isAdmin, user]);

  useEffect(() => {
    if (selectedCompany) {
      const storedLocations = JSON.parse(localStorage.getItem("locations") || "[]");
      let filteredLocations = storedLocations.filter(
        (loc) => loc.companyId === selectedCompany
      );
      
      if (!isAdmin && !isPowerUser && user?.locationId) {
        filteredLocations = filteredLocations.filter(
          (loc) => loc.id === user.locationId
        );
      }
      
      setLocations(filteredLocations);

      // Set default location if user has one assigned
      if (user?.locationId && !selectedLocation) {
        setSelectedLocation(user.locationId);
      }
    } else {
      setLocations([]);
      setSelectedLocation("");
    }
  }, [selectedCompany, isAdmin, isPowerUser, user]);

  return (
    <div className="flex gap-4">
      <Select
        value={selectedCompany}
        onValueChange={setSelectedCompany}
        disabled={!isAdmin && user?.companyId}
      >
        <SelectTrigger className="w-[200px]">
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

      <Select
        value={selectedLocation}
        onValueChange={setSelectedLocation}
        disabled={!selectedCompany || (!isAdmin && !isPowerUser && user?.locationId)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione o local" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyLocationFilter;
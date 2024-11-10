import { createContext, useContext, useState } from "react";
import { userService } from "@/services/dataService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    const foundUser = userService.getAll().find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast.success("Login realizado com sucesso!");
      navigate("/");
      return true;
    }
    
    toast.error("Credenciais inválidas!");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAdmin = () => {
    return user?.isAdmin === true;
  };

  const isSystemOwner = () => {
    return user?.systemOwner === true;
  };

  const isPowerUser = () => {
    return user?.role === 'manager' || isAdmin();
  };

  const isManager = () => {
    return user?.role === 'manager';
  };

  const isTechnician = () => {
    return user?.role === 'technician';
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (isSystemOwner()) return true;
    return user.permissions?.[permission] === true;
  };

  const canCreateUsers = () => hasPermission('createUsers');
  const canEditUsers = () => hasPermission('editUsers');
  const canDeleteUsers = () => hasPermission('deleteUsers');
  const canEditSettings = () => hasPermission('editSettings');
  const canManageCompany = () => hasPermission('manageCompany');
  const canViewReports = () => hasPermission('viewReports');
  const canEditEquipments = () => hasPermission('editEquipments');
  const canEditWorkOrders = () => hasPermission('editWorkOrders');
  const canEditInventory = () => hasPermission('editInventory');
  const canEditAreas = () => hasPermission('editAreas');

  return (
    <AuthContext.Provider value={{ 
      user,
      login,
      logout,
      isAdmin,
      isSystemOwner,
      isPowerUser,
      isManager,
      isTechnician,
      hasPermission,
      canCreateUsers,
      canEditUsers,
      canDeleteUsers,
      canEditSettings,
      canManageCompany,
      canViewReports,
      canEditEquipments,
      canEditWorkOrders,
      canEditInventory,
      canEditAreas
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
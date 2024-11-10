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
      toast.success(`Bem-vindo, ${foundUser.name}!`);
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
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    return currentUser?.role === 'admin';
  };

  const isPowerUser = () => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    return currentUser?.role === 'powerUser';
  };

  const hasPermission = (action) => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    if (currentUser?.role === 'admin') return true;
    if (currentUser?.role === 'powerUser' && action.companyId === currentUser.companyId) return true;
    return false;
  };

  const getUserCompany = () => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    return currentUser?.companyId ? {
      id: currentUser.companyId,
      name: currentUser.companyName
    } : null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isPowerUser, 
      hasPermission,
      getUserCompany 
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
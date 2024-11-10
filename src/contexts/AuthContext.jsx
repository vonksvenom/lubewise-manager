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
    return user?.role === 'admin' || user?.systemOwner === true;
  };

  const isPowerUser = () => {
    return user?.role === 'powerUser';
  };

  const isSystemOwner = () => {
    return user?.systemOwner === true;
  };

  const hasPermission = (action) => {
    if (isSystemOwner()) return true;
    if (isAdmin()) return true;
    if (isPowerUser() && user?.companyId === action.companyId) return true;
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isPowerUser, 
      isSystemOwner,
      hasPermission 
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
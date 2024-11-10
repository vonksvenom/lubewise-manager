import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RequestAccess = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    justification: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    // For now, we'll just show a success message
    toast.success("Solicitação enviada com sucesso! Um administrador irá avaliar seu pedido.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-4">Solicitar Acesso</h2>
      
      <div>
        <Input
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Input
          name="department"
          placeholder="Departamento"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Input
          name="role"
          placeholder="Cargo"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <textarea
          name="justification"
          placeholder="Por que você precisa de acesso?"
          value={formData.justification}
          onChange={handleChange}
          required
          className="w-full min-h-[100px] p-2 border rounded-md"
        />
      </div>
      
      <Button type="submit" className="w-full">
        Enviar Solicitação
      </Button>
    </form>
  );
};

export default RequestAccess;
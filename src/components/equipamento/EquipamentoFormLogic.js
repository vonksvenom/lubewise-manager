import { useState } from "react";
import { toast } from "sonner";

export const useEquipamentoForm = (initialData, onSave) => {
  const [formData, setFormData] = useState(
    initialData || {
      nome: "",
      modelo: "",
      tag: "",
      area: "",
      responsavel: "",
      descricao: "",
      status: "Operacional",
      fabricante: "",
      numeroSerie: "",
      dataFabricacao: "",
      sistemas: [],
      conjuntos: [],
      subconjuntos: [],
      componentes: [],
      manual: null,
      critico: false,
    }
  );

  const updateHierarchyProperty = (items, property, value) => {
    return items.map(item => ({
      ...item,
      [property]: value,
      sistemas: item.sistemas ? updateHierarchyProperty(item.sistemas, property, value) : undefined,
      conjuntos: item.conjuntos ? updateHierarchyProperty(item.conjuntos, property, value) : undefined,
      subconjuntos: item.subconjuntos ? updateHierarchyProperty(item.subconjuntos, property, value) : undefined,
      componentes: item.componentes ? updateHierarchyProperty(item.componentes, property, value) : undefined
    }));
  };

  const handleChange = (field, value) => {
    if (field === "area" || field === "critico") {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        sistemas: updateHierarchyProperty(prev.sistemas || [], field, value),
        conjuntos: updateHierarchyProperty(prev.conjuntos || [], field, value),
        subconjuntos: updateHierarchyProperty(prev.subconjuntos || [], field, value),
        componentes: updateHierarchyProperty(prev.componentes || [], field, value)
      }));

      toast.success(`${field === "area" ? "Área" : "Criticidade"} atualizada em toda a hierarquia do equipamento`);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleManualUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("manual", {
          name: file.name,
          content: reader.result,
          type: file.type,
        });
        toast.success("Manual anexado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return {
    formData,
    handleChange,
    handleManualUpload,
    handleSubmit
  };
};
import { useState } from "react";
import { toast } from "sonner";
import { fileStorageService } from "@/services/fileStorageService";

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
      manualKey: null,
      imagem: null,
      imagemKey: null,
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

  const handleChange = async (field, value) => {
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

  const handleManualUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const savedFile = await fileStorageService.saveFile(file, 'manual');
        handleChange("manual", savedFile);
        handleChange("manualKey", savedFile.key);
        toast.success("Manual anexado com sucesso!");
      } catch (error) {
        console.error('Error saving manual:', error);
        toast.error("Erro ao salvar o manual");
      }
    }
  };

  const handleImageUpload = async (file) => {
    if (file) {
      try {
        const savedFile = await fileStorageService.saveFile(file, 'image');
        handleChange("imagem", savedFile);
        handleChange("imagemKey", savedFile.key);
        toast.success("Imagem salva com sucesso!");
      } catch (error) {
        console.error('Error saving image:', error);
        toast.error("Erro ao salvar a imagem");
      }
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
    handleImageUpload,
    handleSubmit
  };
};
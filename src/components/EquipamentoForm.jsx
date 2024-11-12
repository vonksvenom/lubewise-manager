import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { userService, areaService } from "@/services/dataService";
import EquipamentoBasicInfo from "./equipamento/EquipamentoBasicInfo";
import EquipamentoStatusSelect from "./equipamento/EquipamentoStatusSelect";
import EquipamentoDetails from "./equipamento/EquipamentoDetails";
import HierarchyEditDialog from "./equipamento/HierarchyEditDialog";
import MaintenancePlanForm from "./equipamento/MaintenancePlanForm";
import { useEquipamentoForm } from "./equipamento/EquipamentoFormLogic";
import { Network, Wrench } from "lucide-react";
import { useState } from "react";
import MaintenancePlanDialog from "./equipamento/MaintenancePlanDialog";

const EquipamentoForm = ({ initialData, onSave }) => {
  const [hierarchyDialogOpen, setHierarchyDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const {
    formData,
    handleChange,
    handleManualUpload,
    handleSubmit
  } = useEquipamentoForm(initialData, onSave);

  const areas = areaService.getAll();
  const responsaveis = userService.getAll().filter(user => 
    user.role === "technician" || user.role === "supervisor"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EquipamentoBasicInfo formData={formData} handleChange={handleChange} />
      
      <EquipamentoDetails 
        formData={formData}
        handleChange={handleChange}
        areas={areas}
        responsaveis={responsaveis}
      />

      <EquipamentoStatusSelect 
        value={formData.status}
        onValueChange={(value) => handleChange("status", value)}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => setHierarchyDialogOpen(true)}
        >
          <Network className="h-4 w-4" />
          Hierarquia
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => setMaintenanceDialogOpen(true)}
        >
          <Wrench className="h-4 w-4" />
          Planos de Manutenção
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="manual" className="text-sm font-medium">Manual do Equipamento</label>
        <input
          id="manual"
          type="file"
          onChange={handleManualUpload}
          className="cursor-pointer"
        />
        {formData.manual && (
          <p className="text-sm text-muted-foreground">
            Arquivo atual: {formData.manual.name}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </div>

      <HierarchyEditDialog
        equipamento={formData}
        open={hierarchyDialogOpen}
        onOpenChange={setHierarchyDialogOpen}
        onUpdate={(updatedData) => {
          handleChange("sistemas", updatedData.sistemas);
          handleChange("conjuntos", updatedData.conjuntos);
          handleChange("subconjuntos", updatedData.subconjuntos);
          handleChange("componentes", updatedData.componentes);
        }}
      />

      <MaintenancePlanDialog
        plans={formData.maintenancePlans || []}
        open={maintenanceDialogOpen}
        onOpenChange={setMaintenanceDialogOpen}
        onUpdate={(plans) => handleChange("maintenancePlans", plans)}
      />
    </form>
  );
};

export default EquipamentoForm;
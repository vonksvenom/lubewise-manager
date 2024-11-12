import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { userService, areaService } from "@/services/dataService";
import EquipamentoBasicInfo from "./equipamento/EquipamentoBasicInfo";
import EquipamentoStatusSelect from "./equipamento/EquipamentoStatusSelect";
import EquipamentoSubequipamentos from "./equipamento/EquipamentoSubequipamentos";
import EquipamentoDetails from "./equipamento/EquipamentoDetails";
import { useEquipamentoForm } from "./equipamento/EquipamentoFormLogic";

const EquipamentoForm = ({ initialData, onSave }) => {
  const {
    formData,
    handleChange,
    handleManualUpload,
    handleSubequipamentoAdd,
    handleSubequipamentoRemove,
    handleSubmit
  } = useEquipamentoForm(initialData, onSave);

  const areas = areaService.getAll();
  const responsaveis = userService.getAll().filter(user => 
    user.role === "technician" || user.role === "supervisor"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <EquipamentoSubequipamentos
        subequipamentos={formData.subequipamentos || []}
        onAdd={handleSubequipamentoAdd}
        onRemove={handleSubequipamentoRemove}
      />

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default EquipamentoForm;
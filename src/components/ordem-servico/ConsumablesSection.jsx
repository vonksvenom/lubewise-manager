import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ConsumablesSection = ({ formData, handleConsumableChange }) => {
  const [enabledConsumables, setEnabledConsumables] = useState({
    Óleo: false,
    Graxa: false,
  });

  const handleCheckboxChange = (type) => {
    setEnabledConsumables((prev) => {
      const newState = { ...prev, [type]: !prev[type] };
      if (!newState[type]) {
        handleConsumableChange(type, 0);
      }
      return newState;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Consumíveis</h3>
      {formData.consumables.map((consumable) => (
        <div key={consumable.type} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${consumable.type}`}
              checked={enabledConsumables[consumable.type]}
              onCheckedChange={() => handleCheckboxChange(consumable.type)}
            />
            <Label htmlFor={`checkbox-${consumable.type}`}>
              {consumable.type} ({consumable.type === "Óleo" ? "L" : "g"})
            </Label>
          </div>
          {enabledConsumables[consumable.type] && (
            <Input
              type="number"
              min="0"
              value={consumable.quantity}
              onChange={(e) =>
                handleConsumableChange(consumable.type, e.target.value)
              }
              placeholder={`Quantidade de ${consumable.type} em ${
                consumable.type === "Óleo" ? "litros" : "gramas"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ConsumablesSection;
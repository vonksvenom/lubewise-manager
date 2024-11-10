import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ordemServicoService, inventarioService } from "@/services/dataService";
import { useState, useEffect } from "react";
import { format, addMonths, startOfMonth, isSameMonth } from "date-fns";

export const InventoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const orders = ordemServicoService.getAll();
    const inventory = inventarioService.getAll();

    const next6Months = Array.from({ length: 6 }, (_, i) => {
      const date = addMonths(startOfMonth(new Date()), i);
      return {
        month: format(date, "MMM/yyyy"),
        date: date,
        oleo: 0,
        graxa: 0,
        oleoPrevisao: 0,
        graxaPrevisao: 0,
      };
    });

    // Add inventory data
    inventory.forEach((item) => {
      const monthIndex = next6Months.findIndex((m) =>
        isSameMonth(new Date(item.dataRegistro), m.date)
      );
      if (monthIndex >= 0) {
        const type = item.type.toLowerCase();
        if (type === "oleo" || type === "graxa") {
          next6Months[monthIndex][type] += item.quantity;
        }
      }
    });

    // Add predicted consumption from orders
    orders.forEach((order) => {
      if (order.consumables && order.status !== "Cancelada") {
        const monthIndex = next6Months.findIndex((m) =>
          isSameMonth(new Date(order.dataInicio), m.date)
        );
        if (monthIndex >= 0) {
          order.consumables.forEach((consumable) => {
            const type = consumable.type.toLowerCase();
            if (type === "óleo") {
              next6Months[monthIndex].oleoPrevisao += consumable.quantity;
            } else if (type === "graxa") {
              next6Months[monthIndex].graxaPrevisao += consumable.quantity;
            }
          });
        }
      }
    });

    // Calculate remaining inventory after consumption
    next6Months.forEach((month, index) => {
      if (index > 0) {
        month.oleo = Math.max(
          0,
          next6Months[index - 1].oleo - next6Months[index - 1].oleoPrevisao
        );
        month.graxa = Math.max(
          0,
          next6Months[index - 1].graxa - next6Months[index - 1].graxaPrevisao
        );
      }
    });

    setData(next6Months);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#666" />
        <XAxis
          dataKey="month"
          stroke="#E4941A"
          style={{ fontSize: "0.875rem" }}
        />
        <YAxis stroke="#E4941A" style={{ fontSize: "0.875rem" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            border: "1px solid #666",
            color: "#E4941A",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="oleo"
          stroke="#00ffff"
          strokeWidth={2}
          name="Óleo Disponível (L)"
        />
        <Line
          type="monotone"
          dataKey="graxa"
          stroke="#ff00ff"
          strokeWidth={2}
          name="Graxa Disponível (Kg)"
        />
        <Line
          type="monotone"
          dataKey="oleoPrevisao"
          stroke="#ff0000"
          strokeWidth={2}
          name="Óleo Previsto (L)"
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="graxaPrevisao"
          stroke="#00ff00"
          strokeWidth={2}
          name="Graxa Prevista (Kg)"
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
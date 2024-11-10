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
import { format, addMonths, startOfMonth } from "date-fns";

export const InventoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const orders = ordemServicoService.getAll();
    const inventory = inventarioService.getAll();

    const next6Months = Array.from({ length: 6 }, (_, i) => {
      const date = addMonths(startOfMonth(new Date()), i);
      return {
        month: format(date, "MMM/yyyy"),
        oleo: 0,
        graxa: 0,
      };
    });

    // Add inventory data
    inventory.forEach((item) => {
      const monthIndex = new Date(item.dataRegistro).getMonth();
      if (monthIndex < 6) {
        const type = item.type.toLowerCase();
        if (type === "oleo" || type === "graxa") {
          next6Months[monthIndex][type] += item.quantity;
        }
      }
    });

    // Subtract consumed quantities from orders
    orders.forEach((order) => {
      if (order.consumables) {
        const monthIndex = new Date(order.dataInicio).getMonth();
        if (monthIndex < 6) {
          order.consumables.forEach((consumable) => {
            const type = consumable.type.toLowerCase();
            if (type === "oleo" || type === "graxa") {
              next6Months[monthIndex][type] -= consumable.quantity;
            }
          });
        }
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
          name="Óleo (L)"
        />
        <Line
          type="monotone"
          dataKey="graxa"
          stroke="#ff00ff"
          strokeWidth={2}
          name="Graxa (Kg)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
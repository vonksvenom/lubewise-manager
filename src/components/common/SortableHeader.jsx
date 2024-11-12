import { TableHead } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SortableHeader = ({ label, sortKey, sortConfig, onSort, className }) => (
  <TableHead 
    onClick={() => onSort(sortKey)}
    className={cn(
      "cursor-pointer hover:bg-accent/50 transition-colors",
      className
    )}
  >
    <div className="flex items-center gap-2">
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </div>
  </TableHead>
);

export default SortableHeader;
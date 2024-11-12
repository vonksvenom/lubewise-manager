import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, Edit } from "lucide-react";
import OrdemServicoViewDialog from "../ordem-servico/OrdemServicoViewDialog";
import { useState } from "react";

const MaintenanceOrdersDialog = ({ 
  open, 
  onOpenChange, 
  orders, 
  title,
  onEdit = () => {} // Add default empty function
}) => {
  const { isAdmin, isPowerUser } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleEdit = (order) => {
    if (isAdmin || isPowerUser) {
      if (typeof onEdit === 'function') {
        onEdit(order);
        onOpenChange(false);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Fim</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.titulo}</TableCell>
                  <TableCell>{order.tipo}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {format(new Date(order.dataInicio), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.dataFim), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(isAdmin || isPowerUser) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(order)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <OrdemServicoViewDialog
        ordem={selectedOrder}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </>
  );
};

export default MaintenanceOrdersDialog;
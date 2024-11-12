import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import SortableHeader from "@/components/common/SortableHeader";

const InventarioTableHeader = ({ viewMode, sortConfig, sortData }) => (
  <TableHeader>
    <TableRow>
      <SortableHeader 
        label="Nome"
        sortKey="name"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label={viewMode === "tipo" ? "Tipo" : "Descrição Comercial"}
        sortKey={viewMode === "tipo" ? "type" : "descricaoComercial"}
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label="Quantidade"
        sortKey="quantity"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label="Unidade"
        sortKey="unit"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label="Local"
        sortKey="location"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label="Área"
        sortKey="area"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <SortableHeader 
        label="Data Registro"
        sortKey="dataRegistro"
        sortConfig={sortConfig}
        onSort={sortData}
      />
      <TableHead>Ações</TableHead>
    </TableRow>
  </TableHeader>
);

export default InventarioTableHeader;
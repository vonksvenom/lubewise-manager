const InventarioDetails = ({ item }) => (
  <div className="space-y-4">
    <div><strong>Nome:</strong> {item?.name}</div>
    <div><strong>Tipo:</strong> {item?.type}</div>
    <div><strong>Quantidade:</strong> {item?.quantity} {item?.unit}</div>
    <div><strong>Local:</strong> {item?.location}</div>
    <div><strong>Área:</strong> {item?.area}</div>
    <div><strong>Descrição Comercial:</strong> {item?.descricaoComercial}</div>
    <div><strong>Fornecedor:</strong> {item?.fornecedor}</div>
    <div><strong>Aplicação:</strong> {item?.aplicacao}</div>
    <div><strong>Viscosidade:</strong> {item?.viscosidade}</div>
    <div><strong>Ponto de Fluidez:</strong> {item?.pontoFluidez}</div>
    <div><strong>Ponto de Fulgor:</strong> {item?.pontoFulgor}</div>
    <div><strong>Índice de Viscosidade:</strong> {item?.indiceViscosidade}</div>
  </div>
);

export default InventarioDetails;
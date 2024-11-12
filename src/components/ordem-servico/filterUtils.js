export const filterOrdens = (ordem, filters) => {
  if (filters.tipo !== "Todos" && ordem.tipo !== filters.tipo) return false;
  if (filters.tecnicoId !== "Todos" && ordem.tecnicoId !== filters.tecnicoId) return false;
  if (filters.status !== "Todos" && ordem.status !== filters.status) return false;
  if (filters.prioridade !== "Todos" && ordem.prioridade !== filters.prioridade) return false;
  if (filters.equipamentoId !== "Todos" && ordem.equipamentoId !== filters.equipamentoId.toString()) return false;
  return true;
};
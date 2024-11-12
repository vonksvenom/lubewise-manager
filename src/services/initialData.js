export { initialEquipamentos } from './data/equipmentData';
export { initialInventario } from './data/inventoryData';
export { initialOrdensServico } from './data/workOrderData';
export { initialUsers, initialCompanies, initialLocations } from './data/userData';

export const initialAreas = [
  {
    id: "1",
    nome: "Britagem Primária",
    descricao: "Área responsável pela redução inicial do minério através de britadores de grande porte",
    responsavel: "João Silva",
    capacidade: "1000 t/h",
    nivelRisco: "Alto",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-15"
  },
  {
    id: "2",
    nome: "Moagem",
    descricao: "Processo de cominuição do minério em moinhos de bolas e barras",
    responsavel: "Maria Santos",
    capacidade: "800 t/h",
    nivelRisco: "Médio",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-10"
  },
  {
    id: "3",
    nome: "Flotação",
    descricao: "Separação do minério através de processo físico-químico em células de flotação",
    responsavel: "Pedro Costa",
    capacidade: "600 t/h",
    nivelRisco: "Médio",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-20"
  },
  {
    id: "4",
    nome: "Filtragem",
    descricao: "Remoção de água do concentrado através de filtros de pressão",
    responsavel: "Ana Oliveira",
    capacidade: "400 t/h",
    nivelRisco: "Baixo",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-18"
  },
  {
    id: "5",
    nome: "Pátio de Estocagem",
    descricao: "Área de armazenamento do produto final em pilhas",
    responsavel: "Carlos Mendes",
    capacidade: "50000 t",
    nivelRisco: "Baixo",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-12"
  },
  {
    id: "6",
    nome: "Carregamento Ferroviário",
    descricao: "Sistema de carregamento de vagões para transporte ferroviário",
    responsavel: "Roberto Alves",
    capacidade: "2000 t/h",
    nivelRisco: "Médio",
    horasFuncionamento: "12/7",
    ultimaManutencao: "2024-02-14"
  },
  {
    id: "7",
    nome: "Subestação Elétrica",
    descricao: "Fornecimento e distribuição de energia para toda a planta",
    responsavel: "Luciana Martins",
    capacidade: "50 MW",
    nivelRisco: "Alto",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-05"
  },
  {
    id: "8",
    nome: "Tratamento de Água",
    descricao: "Sistema de tratamento e recirculação de água industrial",
    responsavel: "Fernando Souza",
    capacidade: "1000 m³/h",
    nivelRisco: "Médio",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-16"
  },
  {
    id: "9",
    nome: "Barragem de Rejeitos",
    descricao: "Estrutura para disposição de rejeitos do processo",
    responsavel: "Patricia Lima",
    capacidade: "10000000 m³",
    nivelRisco: "Alto",
    horasFuncionamento: "24/7",
    ultimaManutencao: "2024-02-01"
  },
  {
    id: "10",
    nome: "Oficina Mecânica",
    descricao: "Área de manutenção de equipamentos móveis e fixos",
    responsavel: "Ricardo Santos",
    capacidade: "N/A",
    nivelRisco: "Baixo",
    horasFuncionamento: "8/5",
    ultimaManutencao: "2024-02-19"
  }
];
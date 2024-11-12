import { generateRandomDate } from './utils';

const generateEquipamentos = () => {
  const equipamentos = [
    {
      id: "1",
      nome: "Britador Primário Giratório FLSmidth",
      modelo: "TS60-110",
      tag: "BRI-001",
      status: "Operacional",
      area: "Britagem Primária",
      responsavel: "João Silva",
      descricao: "Britador giratório para redução primária de minério de ferro",
      fabricante: "FLSmidth",
      numeroSerie: "FL2023BR001",
      dataFabricacao: "2020-03-15",
      ultimaManutencao: "2024-01-15",
      proximaManutencao: "2024-04-15",
      critico: true,
      lubrificante: {
        descricaoComercial: "Shell Omala S2 G 220",
        recorrenciaRelubrificacao: "3 meses",
        quantidadeRelubrificacao: "200L",
        pontoLubrificacao: "Redutor Principal",
        tipo: "Óleo"
      }
    },
    {
      id: "2",
      nome: "Moinho de Bolas Metso",
      modelo: "MB-7000",
      tag: "MOI-002",
      status: "Operacional",
      area: "Moagem",
      responsavel: "Pedro Santos",
      descricao: "Moinho de bolas para moagem de minério de ferro",
      fabricante: "Metso",
      numeroSerie: "MT2022MB002",
      dataFabricacao: "2021-06-20",
      ultimaManutencao: "2024-02-01",
      proximaManutencao: "2024-05-01",
      critico: true,
      lubrificante: {
        descricaoComercial: "Mobil SHC 630",
        recorrenciaRelubrificacao: "6 meses",
        quantidadeRelubrificacao: "400L",
        pontoLubrificacao: "Mancais e Redutor",
        tipo: "Óleo"
      }
    },
    {
      id: "3",
      nome: "Peneira Vibratória Metso",
      modelo: "SV-20",
      tag: "PEN-003",
      status: "Operacional",
      area: "Classificação",
      responsavel: "Maria Oliveira",
      descricao: "Peneira vibratória para classificação de granulometria",
      fabricante: "Metso",
      numeroSerie: "MT2023PEN003",
      dataFabricacao: "2022-01-10",
      ultimaManutencao: "2023-11-15",
      proximaManutencao: "2024-02-10",
      critico: false,
      lubrificante: {
        descricaoComercial: "Texaco Meropa 320",
        recorrenciaRelubrificacao: "4 meses",
        quantidadeRelubrificacao: "150L",
        pontoLubrificacao: "Mancais",
        tipo: "Óleo"
      }
    },
    {
      id: "4",
      nome: "Caminhão Fora de Estrada Komatsu",
      modelo: "HM300-3",
      tag: "CAM-004",
      status: "Operacional",
      area: "Transporte",
      responsavel: "Carlos Pereira",
      descricao: "Caminhão fora de estrada para transporte de materiais",
      fabricante: "Komatsu",
      numeroSerie: "KOM2023CAM004",
      dataFabricacao: "2021-05-25",
      ultimaManutencao: "2023-12-30",
      proximaManutencao: "2024-06-30",
      critico: true,
      lubrificante: {
        descricaoComercial: "Shell Tellus S2 M 68",
        recorrenciaRelubrificacao: "5 meses",
        quantidadeRelubrificacao: "300L",
        pontoLubrificacao: "Redutor de Diferencial",
        tipo: "Óleo"
      }
    },
    {
      id: "5",
      nome: "Escavadeira Hidráulica Caterpillar",
      modelo: "320E",
      tag: "ESC-005",
      status: "Operacional",
      area: "Escavação",
      responsavel: "Ana Costa",
      descricao: "Escavadeira hidráulica para movimentação de solo",
      fabricante: "Caterpillar",
      numeroSerie: "CAT2023ESC005",
      dataFabricacao: "2020-08-15",
      ultimaManutencao: "2023-09-10",
      proximaManutencao: "2024-02-15",
      critico: true,
      lubrificante: {
        descricaoComercial: "Mobil Mobilith SHC 220",
        recorrenciaRelubrificacao: "3 meses",
        quantidadeRelubrificacao: "80L",
        pontoLubrificacao: "Braços e Link",
        tipo: "Graxa"
      }
    }
  ];

  return equipamentos;
};

export const initialEquipamentos = generateEquipamentos();

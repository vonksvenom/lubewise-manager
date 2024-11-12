import { generateRandomDate } from './utils';

const generateEquipamentos = () => {
  const equipamentos = [
    {
      id: "1",
      nome: "Motor Elétrico WEG W22 Premium",
      modelo: "W22-500HP-4P",
      tag: "ME-001",
      status: "Operacional",
      area: "Britagem Primária",
      responsavel: "João Silva",
      descricao: "Motor elétrico trifásico de alta eficiência para acionamento do britador primário, 500HP, 1785 RPM, 4160V",
      fabricante: "WEG",
      numeroSerie: "22W4B987654",
      dataFabricacao: "2020-03-15",
      ultimaManutencao: "2024-01-15",
      proximaManutencao: "2024-04-15",
      critico: true,
      lubrificante: {
        descricaoComercial: "Shell Gadus S2 V100 3",
        recorrenciaRelubrificacao: "4000 horas",
        quantidadeRelubrificacao: "120g",
        pontoLubrificacao: "Mancais dianteiro e traseiro",
        tipo: "Graxa"
      }
    },
    {
      id: "2",
      nome: "Compressor de Ar Atlas Copco GA 110",
      modelo: "GA110VSD+",
      tag: "CA-002",
      status: "Operacional",
      area: "Utilidades",
      responsavel: "Pedro Santos",
      descricao: "Compressor de ar rotativo de parafuso com velocidade variável, 110kW, pressão máxima 8.6 bar, vazão FAD 21.9 m³/min",
      fabricante: "Atlas Copco",
      numeroSerie: "AIF458762",
      dataFabricacao: "2021-06-20",
      ultimaManutencao: "2024-02-01",
      proximaManutencao: "2024-05-01",
      critico: true,
      lubrificante: {
        descricaoComercial: "Roto-Z Fluid",
        recorrenciaRelubrificacao: "8000 horas",
        quantidadeRelubrificacao: "40L",
        pontoLubrificacao: "Unidade compressora",
        tipo: "Óleo"
      }
    },
    {
      id: "3",
      nome: "Bomba Centrífuga KSB Megabloc",
      modelo: "40-125",
      tag: "BC-003",
      status: "Operacional",
      area: "Tratamento de Água",
      responsavel: "Maria Oliveira",
      descricao: "Bomba centrífuga horizontal monobloco para água industrial, vazão 45 m³/h, altura manométrica 32 mca",
      fabricante: "KSB",
      numeroSerie: "MB2023458",
      dataFabricacao: "2022-01-10",
      ultimaManutencao: "2023-11-15",
      proximaManutencao: "2024-02-10",
      critico: false,
      lubrificante: {
        descricaoComercial: "Texaco Rando HD 46",
        recorrenciaRelubrificacao: "2000 horas",
        quantidadeRelubrificacao: "0.5L",
        pontoLubrificacao: "Rolamentos",
        tipo: "Óleo"
      }
    },
    {
      id: "4",
      nome: "Guindaste Móvel Liebherr LTM",
      modelo: "1100-4.2",
      tag: "GM-004",
      status: "Operacional",
      area: "Manutenção",
      responsavel: "Carlos Pereira",
      descricao: "Guindaste móvel todo terreno, capacidade máxima 100 toneladas, lança telescópica 60m, motor diesel 449HP",
      fabricante: "Liebherr",
      numeroSerie: "LTM2023789",
      dataFabricacao: "2021-05-25",
      ultimaManutencao: "2023-12-30",
      proximaManutencao: "2024-06-30",
      critico: true,
      lubrificante: {
        descricaoComercial: "Shell Spirax S4 ATF HDX",
        recorrenciaRelubrificacao: "1000 horas",
        quantidadeRelubrificacao: "60L",
        pontoLubrificacao: "Sistema hidráulico",
        tipo: "Óleo"
      }
    },
    {
      id: "5",
      nome: "Unidade Hidráulica Parker",
      modelo: "D-Pack 150",
      tag: "UH-005",
      status: "Operacional",
      area: "Prensa",
      responsavel: "Ana Costa",
      descricao: "Unidade hidráulica com reservatório de 150L, bomba de pistões axiais, pressão máxima 350 bar, vazão 80 L/min",
      fabricante: "Parker Hannifin",
      numeroSerie: "PH2023456",
      dataFabricacao: "2020-08-15",
      ultimaManutencao: "2023-09-10",
      proximaManutencao: "2024-02-15",
      critico: true,
      lubrificante: {
        descricaoComercial: "Mobil DTE 25",
        recorrenciaRelubrificacao: "4000 horas",
        quantidadeRelubrificacao: "150L",
        pontoLubrificacao: "Reservatório principal",
        tipo: "Óleo"
      }
    }
  ];

  return equipamentos;
};

export const initialEquipamentos = generateEquipamentos();
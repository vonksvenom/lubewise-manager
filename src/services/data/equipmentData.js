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
      sistemas: [
        {
          id: "1.1",
          nome: "Sistema de Refrigeração",
          tag: "SR-001",
          conjuntos: [
            {
              id: "1.1.1",
              nome: "Ventilador",
              tag: "VT-001",
              subconjuntos: [
                {
                  id: "1.1.1.1",
                  nome: "Rotor do Ventilador",
                  tag: "RV-001",
                  componentes: [
                    {
                      id: "1.1.1.1.1",
                      nome: "Pás do Rotor",
                      tag: "PR-001"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "1.2",
          nome: "Sistema de Lubrificação",
          tag: "SL-001",
          conjuntos: [
            {
              id: "1.2.1",
              nome: "Mancal Dianteiro",
              tag: "MD-001",
              subconjuntos: [
                {
                  id: "1.2.1.1",
                  nome: "Rolamento Dianteiro",
                  tag: "RD-001",
                  componentes: [
                    {
                      id: "1.2.1.1.1",
                      nome: "Pista Externa",
                      tag: "PE-001"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      lubrificante: {
        descricaoComercial: "Shell Gadus S2 V100 3",
        recorrenciaRelubrificacao: "4000 horas",
        quantidadeRelubrificacao: "120g",
        pontoLubrificacao: "Mancais dianteiro e traseiro",
        tipo: "Graxa"
      }
    }
  ];

  return equipamentos;
};

export const initialEquipamentos = generateEquipamentos();
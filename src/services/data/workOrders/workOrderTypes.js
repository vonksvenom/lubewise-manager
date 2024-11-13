export const tipos = ["Preventiva", "Preditiva", "Corretiva", "Proativa"];

export const titulosPreventiva = [
  "Manutenção Preventiva - Troca de Óleo",
  "Manutenção Preventiva - Inspeção Geral",
  "Manutenção Preventiva - Alinhamento",
  "Manutenção Preventiva - Calibração"
];

export const titulosCorretiva = [
  "Reparo de Vazamento",
  "Substituição de Componente",
  "Correção de Falha",
  "Reparo Emergencial"
];

export const titulosPreditiva = [
  "Análise de Vibração",
  "Termografia",
  "Análise de Óleo",
  "Ultrassom"
];

export const titulosProativa = [
  "Melhoria de Eficiência",
  "Upgrade de Sistema",
  "Otimização de Processo",
  "Modernização de Equipamento"
];

export const getStatusClassName = (status) => {
  switch (status) {
    case "Preventiva":
      return "bg-yellow-100 text-yellow-800";
    case "Corretiva":
      return "bg-red-100 text-red-800";
    case "Preditiva":
      return "bg-purple-100 text-purple-800";
    case "Proativa":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
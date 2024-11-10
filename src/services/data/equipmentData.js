import { generateRandomDate } from './utils';

const defaultEquipmentImage = '/placeholder.svg';

const generateEquipamentos = () => {
  const equipamentos = [];
  const status = ["Operacional", "Em Manutenção", "Inativo"];
  const areas = ["Produção", "Manutenção", "Almoxarifado", "Expedição", "Qualidade"];
  
  for (let i = 1; i <= 100; i++) {
    const dataFabricacao = generateRandomDate(new Date(2015, 0, 1), new Date());
    const ultimaManutencao = generateRandomDate(new Date(2023, 0, 1), new Date());
    const proximaManutencao = generateRandomDate(new Date(), new Date(2024, 11, 31));

    equipamentos.push({
      id: i.toString(),
      nome: `Equipamento ${i}`,
      modelo: `Modelo ${Math.floor(i/3)}`,
      tag: `TAG-${i.toString().padStart(4, '0')}`,
      status: status[Math.floor(Math.random() * status.length)],
      area: areas[Math.floor(Math.random() * areas.length)],
      responsavel: `Responsável ${Math.floor(i/5)}`,
      descricao: `Descrição detalhada do equipamento ${i}`,
      fabricante: `Fabricante ${Math.floor(i/4)}`,
      numeroSerie: `NS${i.toString().padStart(6, '0')}`,
      dataFabricacao: dataFabricacao.toISOString().split('T')[0],
      ultimaManutencao: ultimaManutencao.toISOString().split('T')[0],
      proximaManutencao: proximaManutencao.toISOString().split('T')[0],
      imagem: defaultEquipmentImage
    });
  }
  return equipamentos;
};

export const initialEquipamentos = generateEquipamentos();
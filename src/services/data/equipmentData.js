const generateEquipamentos = (count = 150) => {
  const areas = [
    "Britagem Primária",
    "Moagem",
    "Flotação",
    "Filtragem",
    "Pátio de Estocagem",
    "Carregamento Ferroviário",
    "Subestação Elétrica",
    "Tratamento de Água",
    "Barragem de Rejeitos",
    "Oficina Mecânica"
  ];

  const status = ["Operacional", "Em Manutenção"];
  const tipos = ["Preventiva", "Preditiva"];
  const prioridades = ["Baixa", "Media", "Alta"];
  const recorrencias = ["monthly", "quarterly", "sixmonths", "yearly"];

  const equipamentos = [];

  for (let i = 1; i <= count; i++) {
    const area = areas[Math.floor(Math.random() * areas.length)];
    const equipNumber = String(i).padStart(3, '0');
    const isCritical = Math.random() > 0.7;

    // Generate maintenance plans
    const maintenancePlans = [];
    const numPlans = Math.floor(Math.random() * 3) + 1; // 1 to 3 plans per equipment

    for (let p = 0; p < numPlans; p++) {
      maintenancePlans.push({
        id: `${i}-${p}`,
        tipo: tipos[Math.floor(Math.random() * tipos.length)],
        titulo: `Manutenção ${tipos[Math.floor(Math.random() * tipos.length)]} - ${area}`,
        descricao: `Plano de manutenção para o equipamento ${equipNumber}`,
        dataInicio: new Date(2024, 0, Math.floor(Math.random() * 28) + 1).toISOString(),
        recorrencia: recorrencias[Math.floor(Math.random() * recorrencias.length)],
        prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
      });
    }

    // Generate hierarchy
    const sistemas = [];
    const numSistemas = Math.floor(Math.random() * 3) + 1;

    for (let s = 0; s < numSistemas; s++) {
      const sistema = {
        id: `${i}-S${s}`,
        nome: `Sistema ${s + 1}`,
        tag: `${area.substring(0, 3).toUpperCase()}-SIS-${equipNumber}-${s + 1}`,
        descricao: `Sistema ${s + 1} do equipamento ${equipNumber}`,
        area: area,
        critico: isCritical,
        conjuntos: []
      };

      const numConjuntos = Math.floor(Math.random() * 3) + 1;
      for (let c = 0; c < numConjuntos; c++) {
        const conjunto = {
          id: `${i}-S${s}-C${c}`,
          nome: `Conjunto ${c + 1}`,
          tag: `${area.substring(0, 3).toUpperCase()}-CON-${equipNumber}-${s + 1}-${c + 1}`,
          descricao: `Conjunto ${c + 1} do sistema ${s + 1}`,
          area: area,
          critico: isCritical,
          subconjuntos: []
        };

        const numSubconjuntos = Math.floor(Math.random() * 3) + 1;
        for (let sc = 0; sc < numSubconjuntos; sc++) {
          const subconjunto = {
            id: `${i}-S${s}-C${c}-SC${sc}`,
            nome: `Subconjunto ${sc + 1}`,
            tag: `${area.substring(0, 3).toUpperCase()}-SUB-${equipNumber}-${s + 1}-${c + 1}-${sc + 1}`,
            descricao: `Subconjunto ${sc + 1} do conjunto ${c + 1}`,
            area: area,
            critico: isCritical,
            componentes: []
          };

          const numComponentes = Math.floor(Math.random() * 4) + 1;
          for (let cp = 0; cp < numComponentes; cp++) {
            subconjunto.componentes.push({
              id: `${i}-S${s}-C${c}-SC${sc}-CP${cp}`,
              nome: `Componente ${cp + 1}`,
              tag: `${area.substring(0, 3).toUpperCase()}-COM-${equipNumber}-${s + 1}-${c + 1}-${sc + 1}-${cp + 1}`,
              descricao: `Componente ${cp + 1} do subconjunto ${sc + 1}`,
              area: area,
              critico: isCritical
            });
          }

          conjunto.subconjuntos.push(subconjunto);
        }

        sistema.conjuntos.push(conjunto);
      }

      sistemas.push(sistema);
    }

    equipamentos.push({
      id: i.toString(),
      nome: `Equipamento ${equipNumber}`,
      tag: `${area.substring(0, 3).toUpperCase()}-EQ-${equipNumber}`,
      modelo: `Modelo ${Math.floor(Math.random() * 100) + 1}`,
      fabricante: `Fabricante ${Math.floor(Math.random() * 10) + 1}`,
      area: area,
      descricao: `Equipamento ${equipNumber} da área de ${area}`,
      status: status[Math.floor(Math.random() * status.length)],
      responsavel: `Técnico ${Math.floor(Math.random() * 5) + 1}`,
      sistemas: sistemas,
      maintenancePlans: maintenancePlans,
      critico: isCritical,
      ultimaManutencao: new Date(2023, 11, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      proximaManutencao: new Date(2024, 5, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    });
  }

  return equipamentos;
};

export const initialEquipamentos = generateEquipamentos();
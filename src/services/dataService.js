import { api } from './api';

export const userService = {
  async getAll() {
    return await api.getUsers();
  },
  async add(user) {
    return await api.createUser(user);
  },
  async getById(id) {
    const users = await this.getAll();
    return users.find(user => user.id === id);
  },
  async update(id, user) {
    const users = await this.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      const updatedUser = { ...users[index], ...user };
      await api.createUser(updatedUser);
      return updatedUser;
    }
    return null;
  },
  async delete(id) {
    const users = await this.getAll();
    const filtered = users.filter(user => user.id !== id);
    await api.createUser(filtered);
  },
  async getCurrentUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  },
  async setCurrentUser(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  async changePassword(userId, currentPassword, newPassword) {
    const users = await this.getAll();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.password !== currentPassword) {
      throw new Error('Senha atual incorreta');
    }

    user.password = newPassword;
    await api.createUser(user);

    const currentUser = await this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      await this.setCurrentUser(user);
    }
  }
};

export const equipamentoService = {
  async getAll() {
    return await api.getEquipamentos();
  },
  async add(equipamento) {
    return await api.createEquipamento(equipamento);
  },
  async getById(id) {
    const equipamentos = await this.getAll();
    return equipamentos.find(equip => equip.id === id);
  },
  async update(id, equipamento) {
    const equipamentos = await this.getAll();
    const index = equipamentos.findIndex(e => e.id === id);
    if (index !== -1) {
      const updatedEquipamento = { ...equipamentos[index], ...equipamento };
      await api.createEquipamento(updatedEquipamento);
      return updatedEquipamento;
    }
    return null;
  },
  async delete(id) {
    const equipamentos = await this.getAll();
    const filtered = equipamentos.filter(equip => equip.id !== id);
    await api.createEquipamento(filtered);
  }
};

export const ordemServicoService = {
  async getAll() {
    return await api.getOrdensServico();
  },
  async add(ordem) {
    return await api.createOrdemServico(ordem);
  },
  async getById(id) {
    const ordensServico = await this.getAll();
    return ordensServico.find(ordem => ordem.id === id);
  },
  async update(id, ordem) {
    const ordensServico = await this.getAll();
    const index = ordensServico.findIndex(os => os.id === id);
    if (index !== -1) {
      const updatedOrdem = { ...ordensServico[index], ...ordem };
      await api.createOrdemServico(updatedOrdem);
      return updatedOrdem;
    }
    return null;
  },
  async delete(id) {
    const ordensServico = await this.getAll();
    const filtered = ordensServico.filter(ordem => ordem.id !== id);
    await api.createOrdemServico(filtered);
  }
};

export const inventarioService = {
  async getAll() {
    return await api.getInventario();
  },
  async add(item) {
    return await api.createInventario(item);
  },
  async getById(id) {
    const inventario = await this.getAll();
    return inventario.find(item => item.id === id);
  },
  async update(id, item) {
    const inventario = await this.getAll();
    const index = inventario.findIndex(i => i.id === id);
    if (index !== -1) {
      const updatedItem = { ...inventario[index], ...item };
      await api.createInventario(updatedItem);
      await this.addToHistorico({
        ...updatedItem,
        historicoId: Date.now().toString(),
        tipoOperacao: item.quantity > inventario[index].quantity ? 'Entrada' : 'Saída'
      });
      return updatedItem;
    }
    return null;
  },
  async delete(id) {
    const inventario = await this.getAll();
    const item = inventario.find(i => i.id === id);
    if (item) {
      const filtered = inventario.filter(i => i.id !== id);
      await api.createInventario(filtered);
      await this.addToHistorico({
        ...item,
        historicoId: Date.now().toString(),
        tipoOperacao: 'Remoção'
      });
    }
  },
  async getHistorico() {
    const data = localStorage.getItem('inventario_historico');
    return data ? JSON.parse(data) : [];
  },
  async addToHistorico(item) {
    const historico = await this.getHistorico();
    historico.push(item);
    localStorage.setItem('inventario_historico', JSON.stringify(historico));
  },
  async getHistoricoByPeriod(startDate, endDate, area = null) {
    const historico = await this.getHistorico();
    return historico.filter(item => {
      const itemDate = new Date(item.dataRegistro);
      const isInDateRange = itemDate >= startDate && itemDate <= endDate;
      return area ? isInDateRange && item.area === area : isInDateRange;
    });
  }
};

export const areaService = {
  async getAll() {
    return await api.getAreas();
  },
  async add(area) {
    return await api.createArea(area);
  },
  async getById(id) {
    const areas = await this.getAll();
    return areas.find(area => area.id === id);
  },
  async update(id, area) {
    const areas = await this.getAll();
    const index = areas.findIndex(a => a.id === id);
    if (index !== -1) {
      const updatedArea = { ...areas[index], ...area };
      await api.createArea(updatedArea);
      return updatedArea;
    }
    return null;
  },
  async delete(id) {
    const areas = await this.getAll();
    const filtered = areas.filter(area => area.id !== id);
    await api.createArea(filtered);
  }
};

export const companyService = {
  async getAll() {
    return await api.getCompanies();
  },
  async add(company) {
    return await api.createCompany(company);
  },
  async getById(id) {
    const companies = await this.getAll();
    return companies.find(company => company.id === id);
  },
  async update(id, company) {
    const companies = await this.getAll();
    const index = companies.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedCompany = { ...companies[index], ...company };
      await api.createCompany(updatedCompany);
      return updatedCompany;
    }
    return null;
  },
  async delete(id) {
    const companies = await this.getAll();
    const filtered = companies.filter(company => company.id !== id);
    await api.createCompany(filtered);
  }
};

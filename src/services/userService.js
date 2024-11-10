let users = [];

export const userService = {
  getAll: () => users,
  add: (user) => {
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    return newUser;
  },
  update: (id, data) => {
    users = users.map((user) =>
      user.id === id ? { ...user, ...data } : user
    );
    return users.find((user) => user.id === id);
  },
  delete: (id) => {
    users = users.filter((user) => user.id !== id);
  },
  getCurrentUser: () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },
};

// Initialize sample data
users = [
  { 
    id: 1, 
    name: "Admin", 
    email: "admin@example.com", 
    password: "admin123", 
    role: "Administrador", 
    department: "TI", 
    isAdmin: true 
  },
  { 
    id: 2, 
    name: "João Silva", 
    email: "joao@example.com", 
    password: "joao123", 
    role: "Técnico", 
    department: "Manutenção", 
    isAdmin: false 
  },
  { 
    id: 3, 
    name: "Maria Santos", 
    email: "maria@example.com", 
    password: "maria123", 
    role: "Analista", 
    department: "Operações", 
    isAdmin: false 
  },
];
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
    return users.find((user) => user.isAdmin) || null;
  },
};

// Initialize sample data
users = [
  { id: 1, nome: "Admin", email: "admin@example.com", isAdmin: true },
  { id: 2, nome: "João Silva", email: "joao@example.com", isAdmin: false },
  { id: 3, nome: "Maria Santos", email: "maria@example.com", isAdmin: false },
];
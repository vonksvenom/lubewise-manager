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
    email: "admin@admin.com", 
    password: "admin123", 
    role: "admin", 
    department: "TI", 
    isAdmin: true 
  },
  { 
    id: 2, 
    name: "User", 
    email: "user@user.com", 
    password: "user123", 
    role: "user", 
    department: "Manutenção", 
    isAdmin: false 
  },
  { 
    id: 3, 
    name: "Operador", 
    email: "opr@opr.com", 
    password: "opr123", 
    role: "operator", 
    department: "Operações", 
    isAdmin: false 
  },
];
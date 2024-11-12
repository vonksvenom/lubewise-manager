import { initialUsers } from './initialData';

let users = [...initialUsers];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id);
};

const add = (user) => {
  if (user.email) {
    const existingUser = users.find(u => u.email?.toLowerCase() === user.email.toLowerCase());
    if (existingUser) {
      throw new Error('Já existe um usuário cadastrado com este email');
    }
  }

  const newUser = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(newUser);
  return newUser;
};

const update = (id, user) => {
  const index = users.findIndex(u => u.id === id);
  
  if (user.email) {
    const existingUser = users.find(u => 
      u.email?.toLowerCase() === user.email.toLowerCase() && u.id !== id
    );
    if (existingUser) {
      throw new Error('Este email já está em uso por outro usuário');
    }
  }

  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === id) {
      setCurrentUser(users[index]);
    }
    
    return users[index];
  }
  return null;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === id) {
    setCurrentUser(null);
  }
};

const getCurrentUser = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

const changePassword = (userId, currentPassword, newPassword) => {
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== currentPassword) {
    throw new Error('Senha atual incorreta');
  }

  user.password = newPassword;

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(user);
  }
};

const updateLastAccess = (userId) => {
  const index = users.findIndex(u => u.id === userId);
  
  if (index !== -1) {
    users[index] = { 
      ...users[index], 
      lastAccess: new Date().toISOString() 
    };
    return users[index];
  }
  return null;
};

const login = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const updatedUser = updateLastAccess(user.id);
    setCurrentUser(updatedUser);
    return updatedUser;
  }
  return null;
};

export const userService = {
  getAll,
  getById,
  add,
  update,
  delete: remove,
  getCurrentUser,
  setCurrentUser,
  changePassword,
  updateLastAccess,
  login,
};
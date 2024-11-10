import { initialUsers } from './initialData';

const STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'user';

const init = () => {
  const existingUsers = localStorage.getItem(STORAGE_KEY);
  if (!existingUsers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
  }
};

const getAll = () => {
  init();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data);
};

const getById = (id) => {
  const users = getAll();
  return users.find(user => user.id === id);
};

const add = (user) => {
  const users = getAll();
  
  // Verifica se o email existe e se já existe um usuário com o mesmo email
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

const update = (id, user) => {
  const users = getAll();
  const index = users.findIndex(u => u.id === id);
  
  // Verifica se o email existe e se já está em uso por outro usuário
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === id) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
    }
    
    return users[index];
  }
  return null;
};

const remove = (id) => {
  const users = getAll();
  const filtered = users.filter(user => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === id) {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

const getCurrentUser = () => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const userService = {
  init,
  getAll,
  getById,
  add,
  update,
  delete: remove,
  getCurrentUser,
  setCurrentUser
};
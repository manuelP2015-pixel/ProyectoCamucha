import { baseUsers } from '../data/users-mock';
import { delay } from './delay';

const USER_KEY = 'minimarket_user';
const USERS_KEY = 'minimarket_users';
let currentUser = loadStoredUser();

function loadStoredUser() {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function persistUser(user) {
  if (typeof localStorage === 'undefined') return;
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

function loadUsers() {
  if (typeof localStorage === 'undefined') return [...baseUsers];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [...baseUsers];
}

function persistUsers(users) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function login({ email, password }) {
  await delay(300);
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Credenciales inválidas');
  currentUser = { ...user, password: undefined };
  persistUser(currentUser);
  return currentUser;
}

export async function register({ name, email, password, role = 'client' }) {
  await delay(300);
  const users = loadUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error('El email ya está registrado');
  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);
  persistUsers(users);
  currentUser = { ...newUser, password: undefined };
  persistUser(currentUser);
  return currentUser;
}

export async function logout() {
  await delay(200);
  currentUser = null;
  persistUser(null);
}

export function getCurrentUser() {
  if (!currentUser) {
    currentUser = loadStoredUser();
  }
  return currentUser;
}

export function requireRole(roles = []) {
  if (!currentUser) throw new Response('No autorizado', { status: 401 });
  if (roles.length && !roles.includes(currentUser.role)) {
    throw new Response('Prohibido', { status: 403 });
  }
  return currentUser;
}


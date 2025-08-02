import axios from 'axios';
import {
  User,
  Category,
  Expense,
  CreateExpenseRequest,
  UpdateExpenseRequest,
  ExpenseFilters,
  TopDayStats
} from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Add this method to usersApi object
create: async (userData: { name: string; email: string; status?: 'active' | 'inactive' }): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
},
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  create: async (name: string): Promise<Category> => {
    const response = await api.post('/categories', { name });
    return response.data;
  },
};

// Expenses API
export const expensesApi = {
  getAll: async (filters?: ExpenseFilters): Promise<Expense[]> => {
    const response = await api.get('/expenses', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Expense> => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (expense: CreateExpenseRequest): Promise<Expense> => {
    const response = await api.post('/expenses', expense);
    return response.data;
  },

  update: async (id: string, expense: UpdateExpenseRequest): Promise<Expense> => {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },

  getTopDaysStats: async (): Promise<TopDayStats[]> => {
    const response = await api.get('/expenses/stats/top-days');
    return response.data;
  },
};
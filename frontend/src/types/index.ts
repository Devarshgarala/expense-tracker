export interface User {
  _id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  user_id: User;
  category_id: Category;
  amount: number;
  date: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseRequest {
  user_id: string;
  category_id: string;
  amount: number;
  date: string;
  description?: string;
}

export interface UpdateExpenseRequest {
  user_id: string;
  category_id: string;
  amount: number;
  date: string;
  description?: string;
}

export interface ExpenseFilters {
  user_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface TopDayStats {
  user: User;
  topDays: {
    date: string;
    totalAmount: number;
    expenseCount: number;
  }[];
}
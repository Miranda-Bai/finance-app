export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}

export interface Month {
  _id: string;
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}
export interface Day {
  id: string;
  _id: string;
  date: string;
  expenses: number;
  revenue: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totoalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createAt: string;
  updatedAt: string;
}

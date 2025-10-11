export type TransactionType = "income" | "expense" | "reimbursement";

export interface Transaction {
  id: number;
  user_id: number;
  bank_account_id: number;
  type: TransactionType;
  amount: number;
  category: string; // Comida, Transporte, Salario, etc.
  description?: string;
  date: string; // ISO 8601 format: YYYY-MM-DD
  created_at: string;
  updated_at: string;
}

// Interface extendida con datos de la cuenta (para queries con JOIN)
export interface TransactionWithAccount extends Transaction {
  account_name: string;
  account_color?: string;
}

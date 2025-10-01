export interface BankAccount {
  id: number;
  user_id: number;
  name: string; // BBVA, Santander, Cash, etc.
  account_type: string; // checking, savings, cash, credit_card
  initial_balance: number;
  current_balance: number;
  currency: string; // USD, MXN, EUR, etc.
  currency_symbol: string; // $, €, etc.
  color?: string; // Hex color para identificación visual (#004481)
  icon?: string; // Identificador del icono (bank, wallet, credit-card)
  is_active: boolean; // Si la cuenta está activa
  created_at: string;
  updated_at: string;
}

import { Ionicons } from "@expo/vector-icons";

// Tipos de transacciones
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  REIMBURSEMENT = "reimbursement",
}

// Interfaces
export interface Category {
  id: number;
  name: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  type: TransactionType;
  created_at: string;
}

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: TransactionType;
  category_id: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionWithCategory extends Transaction {
  category_name: string;
  category_icon: string;
  category_color: string;
}

// Interfaz de Usuario
export interface User {
  id: number;
  name: string;
  email?: string;
  currency: string; // USD, MXN, EUR, etc.
  currency_symbol: string; // $, €, etc.
  monthly_budget?: number;
  profile_image?: string; // URI de la imagen
  created_at: string;
  updated_at: string;
}

// Configuraciones adicionales del usuario
export interface UserSettings {
  user_id: number;
  notifications_enabled: boolean;
  dark_mode: boolean;
  language: string; // es, en, etc.
  date_format: string; // DD/MM/YYYY, MM/DD/YYYY, etc.
  first_day_of_week: number; // 0 = Domingo, 1 = Lunes
}

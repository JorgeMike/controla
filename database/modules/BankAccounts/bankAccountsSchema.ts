import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export interface BankAccount {
  id: number;
  user_id: number;
  name: string; // BBVA, Santander, Cash, etc.
  initial_balance: number;
  current_balance: number;
  currency: string; // USD, MXN, EUR, etc.
  currency_symbol: string; // $, €, etc.
  color?: keyof typeof Colors.light; // Hex color para identificación visual (#004481)
  icon?: React.ComponentProps<typeof Ionicons>["name"]; // Identificador del icono (bank, wallet, credit-card)
  is_active: 1 | 0; // Si la cuenta está activa
  created_at: string;
  updated_at: string;
}

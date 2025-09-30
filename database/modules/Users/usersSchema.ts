export interface User {
  id: number;
  name: string;
  email?: string;
  currency: string; // USD, MXN, EUR, etc.
  currency_symbol: string; // $, €, etc.
  actual_account: boolean; // Indica si es la cuenta actual activa

  // Balance del usuario
  initial_balance: number; // Balance inicial al crear la cuenta
  actual_balance: number; // Balance actual (se actualiza con cada transacción)
  balance_last_updated: string; // Timestamp de última actualización del balance

  profile_image?: string; // URI de la imagen
  created_at: string;
  updated_at: string;
}

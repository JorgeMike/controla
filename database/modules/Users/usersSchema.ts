export interface User {
  id: number;
  name: string;
  email?: string;
  currency: string; // USD, MXN, EUR, etc.
  currency_symbol: string; // $, €, etc.
  actual_account: boolean; // Indica si es la cuenta actual activa
  profile_image?: string; // URI de la imagen
  created_at: string;
  updated_at: string;
}

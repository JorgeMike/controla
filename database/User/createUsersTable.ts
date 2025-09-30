import { SQLiteDatabase } from "expo-sqlite";

export const createUsersTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      currency TEXT NOT NULL DEFAULT 'USD',
      currency_symbol TEXT NOT NULL DEFAULT '$',
      actual_account BOOLEAN NOT NULL DEFAULT 1,
      
      initial_balance REAL NOT NULL DEFAULT 0,
      actual_balance REAL NOT NULL DEFAULT 0,
      balance_last_updated TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
              
      profile_image TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

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

// services/userService.ts
import * as SQLite from "expo-sqlite";
import { BankAccount } from "./bankAccountsSchema";
import { NewBankAccount } from "./bankAccountsTypes";

export class BankAccountService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("controla.db");
  }

  /**
   * Obtiene todos los usuarios
   */
  async getAll(): Promise<BankAccount[]> {
    try {
      const results = await this.db.getAllAsync<BankAccount>(
        "SELECT * FROM bank_accounts"
      );
      return results || [];
    } catch (error) {
      console.error("Error getting all bank accounts:", error);
      throw error;
    }
  }

  async update(id: number, account: Partial<BankAccount>): Promise<void> {}

  async create(account: NewBankAccount): Promise<void> {
    try {
      await this.db.runAsync(
        `INSERT INTO bank_accounts 
        (user_id, name, initial_balance, current_balance, currency, currency_symbol, color, icon, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          account.user_id,
          account.name,
          account.initial_balance,
          account.current_balance,
          account.currency,
          account.currency_symbol,
          account.color || "purple",
          account.icon || "wallet",
          account.is_active ? 1 : 0,
        ]
      );
    } catch (error) {
      console.error("Error creating bank account:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {}

  async getByUserId(userId: number): Promise<BankAccount[]> {
    try {
      const results = await this.db.getAllAsync<BankAccount>(
        "SELECT * FROM bank_accounts WHERE user_id = ?",
        [userId]
      );
      return results || [];
    } catch (error) {
      console.error("Error getting bank accounts by user ID:", error);
      throw error;
    }
  }

  async getAllByUserId(userId: number) {
    try {
      const results = await this.db.getAllAsync<BankAccount>(
        "SELECT * FROM bank_accounts WHERE user_id = ?",
        [userId]
      );
      return results || [];
    } catch (error) {
      console.error("Error getting bank account counts by user ID:", error);
      throw error;
    }
  }
}

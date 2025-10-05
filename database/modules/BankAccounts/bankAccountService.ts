// services/userService.ts
import * as SQLite from "expo-sqlite";
import { BankAccount } from "./bankAccountsSchema";

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

  async create(
    account: Omit<BankAccount, "id" | "created_at" | "updated_at">
  ): Promise<void> {}
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

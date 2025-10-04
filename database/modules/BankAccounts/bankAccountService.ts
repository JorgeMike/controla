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
}

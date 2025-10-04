// services/userService.ts
import { NewUser } from "@/database/types";
import * as SQLite from "expo-sqlite";
import { User } from "./usersSchema";

export class UserService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("controla.db");
  }

  /**
   * Obtiene todos los usuarios
   */
  async getAll(): Promise<User[]> {
    try {
      const results = await this.db.getAllAsync<User>("SELECT * FROM users");
      return results || [];
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  }

  /**
   * Obtiene el usuario actual (cuenta activa)
   */
  async getCurrent(): Promise<User | null> {
    try {
      const result = await this.db.getFirstAsync<User>(
        "SELECT * FROM users WHERE actual_account = 1"
      );
      return result || null;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  /**
   * Obtiene un usuario por ID
   */
  async getById(userId: number): Promise<User | null> {
    try {
      const result = await this.db.getFirstAsync<User>(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      return result || null;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo usuario
   */
  async create(user: NewUser): Promise<number> {
    console.log("👤 Creando usuario...", user);

    try {
      const result = await this.db.runAsync(
        `INSERT INTO users (
          name, 
          email, 
          currency, 
          currency_symbol,
          actual_account,
          profile_image
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          user.name,
          user.email || null,
          user.currency,
          user.currency_symbol,
          user.actual_account ?? true,
          user.profile_image || null,
        ]
      );

      const userId = result.lastInsertRowId;
      console.log("✅ Usuario creado con ID:", userId);

      return userId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  /**
   * Actualiza un usuario existente
   */
  async update(userId: number, userData: Partial<NewUser>): Promise<void> {
    console.log("👤 Actualizando usuario...", userId, userData);

    try {
      const fields: string[] = [];
      const values: any[] = [];

      if (userData.name !== undefined) {
        fields.push("name = ?");
        values.push(userData.name);
      }
      if (userData.email !== undefined) {
        fields.push("email = ?");
        values.push(userData.email || null);
      }
      if (userData.currency !== undefined) {
        fields.push("currency = ?");
        values.push(userData.currency);
      }
      if (userData.currency_symbol !== undefined) {
        fields.push("currency_symbol = ?");
        values.push(userData.currency_symbol);
      }
      if (userData.profile_image !== undefined) {
        fields.push("profile_image = ?");
        values.push(userData.profile_image || null);
      }
      if (userData.actual_account !== undefined) {
        fields.push("actual_account = ?");
        values.push(userData.actual_account);
      }

      if (fields.length === 0) {
        console.log("⚠️ No hay campos para actualizar");
        return;
      }

      fields.push("updated_at = CURRENT_TIMESTAMP");
      values.push(userId);

      await this.db.runAsync(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
      );

      console.log("✅ Usuario actualizado");
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  /**
   * Cambia el usuario actual (actual_account)
   * Desactiva todos los usuarios y activa el seleccionado
   */
  async switchCurrentUser(userId: number): Promise<void> {
    console.log("👤 Cambiando usuario actual a:", userId);

    try {
      await this.db.execAsync("BEGIN TRANSACTION");

      // Desactivar todos los usuarios
      await this.db.runAsync("UPDATE users SET actual_account = 0");

      // Activar el usuario seleccionado
      await this.db.runAsync(
        "UPDATE users SET actual_account = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [userId]
      );

      await this.db.execAsync("COMMIT");
      console.log("✅ Usuario actual cambiado");
    } catch (error) {
      await this.db.execAsync("ROLLBACK");
      console.error("Error switching current user:", error);
      throw error;
    }
  }

  /**
   * Elimina un usuario (soft delete - desactiva la cuenta)
   */
  async delete(userId: number): Promise<void> {
    console.log("👤 Eliminando usuario:", userId);

    try {
      // Verificar que no sea el único usuario activo
      const activeUsers = await this.db.getAllAsync<User>(
        "SELECT id FROM users WHERE actual_account = 1"
      );

      if (activeUsers.length === 1 && activeUsers[0].id === userId) {
        throw new Error(
          "No puedes eliminar el único usuario activo. Crea otro usuario primero."
        );
      }

      // Desactivar el usuario
      await this.db.runAsync(
        "UPDATE users SET actual_account = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [userId]
      );

      console.log("✅ Usuario eliminado (desactivado)");
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  /**
   * Elimina permanentemente un usuario (hard delete)
   * ADVERTENCIA: Esto eliminará también todas sus cuentas y transacciones
   */
  async hardDelete(userId: number): Promise<void> {
    console.log("⚠️ Eliminación permanente del usuario:", userId);

    try {
      await this.db.execAsync("BEGIN TRANSACTION");

      // Eliminar todas las transacciones del usuario
      await this.db.runAsync("DELETE FROM transactions WHERE user_id = ?", [
        userId,
      ]);

      // Eliminar todas las cuentas bancarias del usuario
      await this.db.runAsync("DELETE FROM bank_accounts WHERE user_id = ?", [
        userId,
      ]);

      // Eliminar el usuario
      await this.db.runAsync("DELETE FROM users WHERE id = ?", [userId]);

      await this.db.execAsync("COMMIT");
      console.log("✅ Usuario eliminado permanentemente");
    } catch (error) {
      await this.db.execAsync("ROLLBACK");
      console.error("Error hard deleting user:", error);
      throw error;
    }
  }

  /**
   * Verifica si existe un usuario con el email dado
   */
  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.db.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM users WHERE email = ?",
        [email]
      );
      return (result?.count || 0) > 0;
    } catch (error) {
      console.error("Error checking if user exists by email:", error);
      throw error;
    }
  }
}

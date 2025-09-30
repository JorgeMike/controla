import { openDatabase } from "../database";
import { User } from "../User/createUsersTable";

const db = openDatabase();

export const userRepository = {
  getAll: async (): Promise<User[]> => {
    const results = await db.getAllAsync<User>("SELECT * FROM users");
    return results || [];
  },

  getCurrent: async (): Promise<User | null> => {
    const result = await db.getFirstAsync<User>(
      "SELECT * FROM users WHERE actual_account = 1"
    );
    return result || null;
  },

  // Crear usuario
  create: async (
    user: Omit<
      User,
      | "id"
      | "created_at"
      | "updated_at"
      | "actual_balance"
      | "balance_last_updated"
    >
  ) => {
    console.log("👤 Creando usuario...", user);
    const result = await db.runAsync(
      `INSERT INTO users (
        name, 
        email, 
        currency, 
        currency_symbol, 
        initial_balance, 
        actual_balance, 
        profile_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.email || null,
        user.currency,
        user.currency_symbol,
        user.initial_balance,
        user.initial_balance, // actual_balance inicia igual que initial_balance
        user.profile_image || null,
      ]
    );

    console.log("✅ Usuario creado con ID:", result.lastInsertRowId);

    // Crear configuraciones por defecto para el nuevo usuario
    const userId = result.lastInsertRowId;
    await db.runAsync(`INSERT INTO user_settings (user_id) VALUES (?)`, [
      userId,
    ]);

    return userId;
  },
};

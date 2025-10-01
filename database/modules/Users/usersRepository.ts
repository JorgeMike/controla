import { openDatabase } from "../../database";
import { User } from "./usersSchema";

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
      "id" | "created_at" | "updated_at" | "profile_image" | "actual_account"
    >
  ) => {
    console.log("👤 Creando usuario...", user);
    const result = await db.runAsync(
      `INSERT INTO users (
        name, 
        email, 
        currency, 
        currency_symbol,
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [user.name, user.email || null, user.currency, user.currency_symbol]
    );

    const userId = result.lastInsertRowId;
    console.log("✅ Usuario creado con ID:", userId);

    return userId;
  },
};

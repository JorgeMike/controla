import { openDatabase } from "../database";
import { User, UserSettings } from "../schema";

const db = openDatabase();

export const userRepository = {
  // Obtener el usuario actual (siempre hay solo uno)
  getCurrent: async (): Promise<User | null> => {
    const result = await db.getFirstAsync<User>(
      "SELECT * FROM users ORDER BY id ASC LIMIT 1"
    );
    return result || null;
  },

  // Crear usuario
  create: async (user: Omit<User, "id" | "created_at" | "updated_at">) => {
    const result = await db.runAsync(
      `INSERT INTO users (name, email, currency, currency_symbol, monthly_budget, profile_image) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.email || null,
        user.currency,
        user.currency_symbol,
        user.monthly_budget || null,
        user.profile_image || null,
      ]
    );

    // Crear configuraciones por defecto para el nuevo usuario
    const userId = result.lastInsertRowId;
    await db.runAsync(`INSERT INTO user_settings (user_id) VALUES (?)`, [
      userId,
    ]);

    return userId;
  },

  // Actualizar usuario
  update: async (
    id: number,
    user: Partial<Omit<User, "id" | "created_at">>
  ) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (user.name !== undefined) {
      fields.push("name = ?");
      values.push(user.name);
    }
    if (user.email !== undefined) {
      fields.push("email = ?");
      values.push(user.email);
    }
    if (user.currency !== undefined) {
      fields.push("currency = ?");
      values.push(user.currency);
    }
    if (user.currency_symbol !== undefined) {
      fields.push("currency_symbol = ?");
      values.push(user.currency_symbol);
    }
    if (user.monthly_budget !== undefined) {
      fields.push("monthly_budget = ?");
      values.push(user.monthly_budget);
    }
    if (user.profile_image !== undefined) {
      fields.push("profile_image = ?");
      values.push(user.profile_image);
    }

    if (fields.length === 0) return;

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    await db.runAsync(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  },

  // Obtener configuraciones del usuario
  getSettings: async (userId: number): Promise<UserSettings | null> => {
    const result = await db.getFirstAsync<UserSettings>(
      "SELECT * FROM user_settings WHERE user_id = ?",
      [userId]
    );
    return result || null;
  },

  // Actualizar configuraciones
  updateSettings: async (
    userId: number,
    settings: Partial<Omit<UserSettings, "user_id">>
  ) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (settings.notifications_enabled !== undefined) {
      fields.push("notifications_enabled = ?");
      values.push(settings.notifications_enabled ? 1 : 0);
    }
    if (settings.dark_mode !== undefined) {
      fields.push("dark_mode = ?");
      values.push(settings.dark_mode ? 1 : 0);
    }
    if (settings.language !== undefined) {
      fields.push("language = ?");
      values.push(settings.language);
    }
    if (settings.date_format !== undefined) {
      fields.push("date_format = ?");
      values.push(settings.date_format);
    }
    if (settings.first_day_of_week !== undefined) {
      fields.push("first_day_of_week = ?");
      values.push(settings.first_day_of_week);
    }

    if (fields.length === 0) return;

    values.push(userId);

    await db.runAsync(
      `UPDATE user_settings SET ${fields.join(", ")} WHERE user_id = ?`,
      values
    );
  },

  // Obtener usuario con configuraciones
  getCurrentWithSettings: async (): Promise<
    (User & { settings: UserSettings }) | null
  > => {
    const user = await userRepository.getCurrent();
    if (!user) return null;

    const settings = await userRepository.getSettings(user.id);
    if (!settings) return null;

    return {
      ...user,
      settings,
    };
  },
};

// Lista de monedas comunes
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "Dólar Estadounidense" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "Libra Esterlina" },
  { code: "MXN", symbol: "$", name: "Peso Mexicano" },
  { code: "ARS", symbol: "$", name: "Peso Argentino" },
  { code: "COP", symbol: "$", name: "Peso Colombiano" },
  { code: "CLP", symbol: "$", name: "Peso Chileno" },
  { code: "PEN", symbol: "S/", name: "Sol Peruano" },
  { code: "BRL", symbol: "R$", name: "Real Brasileño" },
  { code: "CAD", symbol: "C$", name: "Dólar Canadiense" },
];

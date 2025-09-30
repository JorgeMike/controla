import * as SQLite from "expo-sqlite";

const DB_NAME = "controla.db";

export const openDatabase = () => {
  return SQLite.openDatabaseSync(DB_NAME);
};

export const initDatabase = async () => {
  const db = openDatabase();

  try {
    // Tabla de usuario
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        currency TEXT NOT NULL DEFAULT 'USD',
        currency_symbol TEXT NOT NULL DEFAULT '$',
        monthly_budget REAL,
        profile_image TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla de configuraciones de usuario
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        notifications_enabled INTEGER DEFAULT 1,
        dark_mode INTEGER DEFAULT 0,
        language TEXT DEFAULT 'es',
        date_format TEXT DEFAULT 'DD/MM/YYYY',
        first_day_of_week INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    // Tabla de categorías
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense', 'reimbursement')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla de transacciones
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        description TEXT,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense', 'reimbursement')),
        category_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
      );
    `);

    // Verificar si existe un usuario
    const userExists = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM users"
    );

    // Si no hay usuario, crear uno por defecto
    if (userExists && userExists.count === 0) {
      await createDefaultUser(db);
    }

    // Insertar categorías por defecto si no existen
    const categoriesExist = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM categories"
    );

    if (categoriesExist && categoriesExist.count === 0) {
      await insertDefaultCategories(db);
    }

    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

// Crear usuario por defecto
const createDefaultUser = async (db: SQLite.SQLiteDatabase) => {
  const result = await db.runAsync(
    `INSERT INTO users (name, currency, currency_symbol) 
     VALUES (?, ?, ?)`,
    ["Usuario", "USD", "$"]
  );

  const userId = result.lastInsertRowId;

  // Crear configuraciones por defecto
  await db.runAsync(
    `INSERT INTO user_settings (user_id, notifications_enabled, dark_mode, language, date_format, first_day_of_week) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, 1, 0, "es", "DD/MM/YYYY", 1]
  );

  console.log("✅ Usuario por defecto creado");
};

// Insertar categorías por defecto
const insertDefaultCategories = async (db: SQLite.SQLiteDatabase) => {
  const defaultCategories = [
    // Ingresos
    { name: "Salario", icon: "cash", color: "green", type: "income" },
    { name: "Freelance", icon: "briefcase", color: "blue", type: "income" },
    {
      name: "Inversiones",
      icon: "trending-up",
      color: "yellow",
      type: "income",
    },

    // Gastos
    {
      name: "Alimentación",
      icon: "fast-food",
      color: "orange",
      type: "expense",
    },
    { name: "Transporte", icon: "car", color: "orange", type: "expense" },
    {
      name: "Entretenimiento",
      icon: "game-controller",
      color: "purple",
      type: "expense",
    },
    {
      name: "Servicios",
      icon: "bulb-outline",
      color: "yellow",
      type: "expense",
    },
    {
      name: "Salud",
      icon: "medkit-outline",
      color: "red",
      type: "expense",
    },
    { name: "Educación", icon: "book", color: "blue", type: "expense" },

    // Reembolsos
    {
      name: "Devolución",
      icon: "arrow-back",
      color: "blue",
      type: "reimbursement",
    },
  ];

  for (const category of defaultCategories) {
    await db.runAsync(
      "INSERT INTO categories (name, icon, color, type) VALUES (?, ?, ?, ?)",
      [category.name, category.icon, category.color, category.type]
    );
  }
};

// Limpiar base de datos (útil para desarrollo)
export const clearDatabase = async () => {
  const db = openDatabase();
  await db.execAsync("DROP TABLE IF EXISTS transactions;");
  await db.execAsync("DROP TABLE IF EXISTS categories;");
  await db.execAsync("DROP TABLE IF EXISTS user_settings;");
  await db.execAsync("DROP TABLE IF EXISTS users;");
  await initDatabase();
};

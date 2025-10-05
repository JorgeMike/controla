import { ONBOARDING_KEY } from "@/constants/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { createUsersTable } from "./modules/Users/createUsersTable";

const DB_NAME = "controla.db";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const openDatabase = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    try {
      dbInstance = SQLite.openDatabaseSync(DB_NAME);
      //console.log("📂 Base de datos abierta correctamente");
    } catch (error) {
      console.error("❌ Error al abrir la base de datos:", error);
      throw new Error("No se pudo abrir la base de datos");
    }
  }
  return dbInstance;
};

export const initDatabase = async (): Promise<void> => {
  const db = openDatabase();

  try {
    // Habilitar foreign keys (importante para integridad referencial)
    await db.execAsync("PRAGMA foreign_keys = ON;");

    // Crear tablas en orden de dependencias
    await createUsersTable(db);

    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

export const clearDatabase = async (): Promise<void> => {
  console.log("🧹 Limpiando base de datos...");

  try {
    const db = openDatabase();

    await db.execAsync("DROP TABLE IF EXISTS users;");
    AsyncStorage.setItem(ONBOARDING_KEY, "false");

    console.log("🗑️ Tablas eliminadas");

    await initDatabase();
    //console.log("♻️ Base de datos reinicializada");
  } catch (error) {
    console.error("❌ Error al limpiar la base de datos:", error);
    throw error;
  }
};

// Función para cerrar la base de datos (útil para testing o cleanup)
export const closeDatabase = (): void => {
  if (dbInstance) {
    try {
      dbInstance.closeSync();
      dbInstance = null;
      console.log("🔒 Base de datos cerrada");
    } catch (error) {
      console.error("⚠️ Error al cerrar la base de datos:", error);
    }
  }
};

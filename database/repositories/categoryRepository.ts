import { openDatabase } from "../database";
import { Category, TransactionType } from "../schema";

const db = openDatabase();

export const categoryRepository = {
  // Obtener todas las categorías
  getAll: async (): Promise<Category[]> => {
    return await db.getAllAsync<Category>(
      "SELECT * FROM categories ORDER BY name"
    );
  },

  // Obtener por tipo
  getByType: async (type: TransactionType): Promise<Category[]> => {
    return await db.getAllAsync<Category>(
      "SELECT * FROM categories WHERE type = ? ORDER BY name",
      [type]
    );
  },

  // Obtener por ID
  getById: async (id: number): Promise<Category | null> => {
    const result = await db.getFirstAsync<Category>(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    return result || null;
  },

  // Crear categoría
  create: async (category: Omit<Category, "id" | "created_at">) => {
    const result = await db.runAsync(
      "INSERT INTO categories (name, icon, color, type) VALUES (?, ?, ?, ?)",
      [category.name, category.icon, category.color, category.type]
    );
    return result.lastInsertRowId;
  },

  // Actualizar categoría
  update: async (
    id: number,
    category: Partial<Omit<Category, "id" | "created_at">>
  ) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (category.name) {
      fields.push("name = ?");
      values.push(category.name);
    }
    if (category.icon) {
      fields.push("icon = ?");
      values.push(category.icon);
    }
    if (category.color) {
      fields.push("color = ?");
      values.push(category.color);
    }
    if (category.type) {
      fields.push("type = ?");
      values.push(category.type);
    }

    values.push(id);

    await db.runAsync(
      `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  },

  // Eliminar categoría
  delete: async (id: number) => {
    await db.runAsync("DELETE FROM categories WHERE id = ?", [id]);
  },
};

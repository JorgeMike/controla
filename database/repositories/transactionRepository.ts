import { openDatabase } from "../database";
import {
  Transaction,
  TransactionType,
  TransactionWithCategory,
} from "../schema";

const db = openDatabase();

export const transactionRepository = {
  // Crear transacción
  create: async (
    transaction: Omit<Transaction, "id" | "created_at" | "updated_at">
  ) => {
    const result = await db.runAsync(
      `INSERT INTO transactions (amount, description, type, category_id, date) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        transaction.amount,
        transaction.description || "",
        transaction.type,
        transaction.category_id,
        transaction.date,
      ]
    );
    return result.lastInsertRowId;
  },

  // Obtener todas las transacciones con categoría
  getAll: async (): Promise<TransactionWithCategory[]> => {
    const result = await db.getAllAsync<TransactionWithCategory>(
      `SELECT 
        t.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
       FROM transactions t
       INNER JOIN categories c ON t.category_id = c.id
       ORDER BY t.date DESC, t.created_at DESC`
    );
    return result;
  },

  // Obtener por ID
  getById: async (id: number): Promise<TransactionWithCategory | null> => {
    const result = await db.getFirstAsync<TransactionWithCategory>(
      `SELECT 
        t.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
       FROM transactions t
       INNER JOIN categories c ON t.category_id = c.id
       WHERE t.id = ?`,
      [id]
    );
    return result || null;
  },

  // Obtener por tipo
  getByType: async (
    type: TransactionType
  ): Promise<TransactionWithCategory[]> => {
    const result = await db.getAllAsync<TransactionWithCategory>(
      `SELECT 
        t.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
       FROM transactions t
       INNER JOIN categories c ON t.category_id = c.id
       WHERE t.type = ?
       ORDER BY t.date DESC`,
      [type]
    );
    return result;
  },

  // Obtener por rango de fechas
  getByDateRange: async (
    startDate: string,
    endDate: string
  ): Promise<TransactionWithCategory[]> => {
    const result = await db.getAllAsync<TransactionWithCategory>(
      `SELECT 
        t.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
       FROM transactions t
       INNER JOIN categories c ON t.category_id = c.id
       WHERE t.date BETWEEN ? AND ?
       ORDER BY t.date DESC`,
      [startDate, endDate]
    );
    return result;
  },

  // Actualizar transacción
  update: async (
    id: number,
    transaction: Partial<Omit<Transaction, "id" | "created_at">>
  ) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (transaction.amount !== undefined) {
      fields.push("amount = ?");
      values.push(transaction.amount);
    }
    if (transaction.description !== undefined) {
      fields.push("description = ?");
      values.push(transaction.description);
    }
    if (transaction.type !== undefined) {
      fields.push("type = ?");
      values.push(transaction.type);
    }
    if (transaction.category_id !== undefined) {
      fields.push("category_id = ?");
      values.push(transaction.category_id);
    }
    if (transaction.date !== undefined) {
      fields.push("date = ?");
      values.push(transaction.date);
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    await db.runAsync(
      `UPDATE transactions SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  },

  // Eliminar transacción
  delete: async (id: number) => {
    await db.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
  },

  // Obtener balance total
  getBalance: async (): Promise<number> => {
    const result = await db.getFirstAsync<{ total: number }>(
      `SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) +
        COALESCE(SUM(CASE WHEN type = 'reimbursement' THEN amount ELSE 0 END), 0) as total
       FROM transactions`
    );
    return result?.total || 0;
  },

  // Obtener totales por tipo
  getTotalsByType: async () => {
    const result = await db.getAllAsync<{
      type: TransactionType;
      total: number;
    }>(
      `SELECT type, COALESCE(SUM(amount), 0) as total 
       FROM transactions 
       GROUP BY type`
    );
    return {
      income: result.find((r) => r.type === "income")?.total || 0,
      expense: result.find((r) => r.type === "expense")?.total || 0,
      reimbursement: result.find((r) => r.type === "reimbursement")?.total || 0,
    };
  },
};

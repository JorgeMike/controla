import { BankAccount } from "./modules/BankAccounts/bankAccountsSchema";
import { Transaction } from "./modules/Transactions/transactionsSchema";
import { User } from "./modules/Users/usersSchema";

// Tipos para los valores permitidos
export type TransactionType = "income" | "expense" | "reimbursement";
export type AccountType = "checking" | "savings" | "cash" | "credit_card";

// Para insertar nuevas transacciones (sin campos auto-generados)
export type NewTransaction = Omit<
  Transaction,
  "id" | "created_at" | "updated_at"
>;

// Para insertar nuevas cuentas bancarias
export type NewBankAccount = Omit<
  BankAccount,
  "id" | "created_at" | "updated_at"
>;

// Para insertar nuevos usuarios
export type NewUser = Omit<User, "id" | "created_at" | "updated_at">;

// Para actualizar transacciones (todos los campos opcionales excepto id)
export type UpdateTransaction = Partial<
  Omit<Transaction, "id" | "user_id" | "created_at">
> & { id: number };

// Para actualizar cuentas bancarias
export type UpdateBankAccount = Partial<
  Omit<BankAccount, "id" | "user_id" | "created_at">
> & { id: number };

// Para actualizar usuarios
export type UpdateUser = Partial<Omit<User, "id" | "created_at">> & {
  id: number;
};

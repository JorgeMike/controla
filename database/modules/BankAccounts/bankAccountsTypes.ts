import { BankAccount } from "./bankAccountsSchema";

export type NewBankAccount = Omit<
  BankAccount,
  "id" | "created_at" | "updated_at"
>;

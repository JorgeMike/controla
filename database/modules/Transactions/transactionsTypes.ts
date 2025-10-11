import { Transaction } from "./transactionsSchema";

export type NewTransaction = Omit<
  Transaction,
  "id" | "created_at" | "updated_at"
>;

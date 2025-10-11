import { Ionicons } from "@expo/vector-icons";
import { BankAccount } from "./bankAccountsSchema";

export type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

export type NewBankAccount = Omit<
  BankAccount,
  "id" | "created_at" | "updated_at"
>;

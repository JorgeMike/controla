// contexts/BankAccountsContext.tsx
import { BankAccountService } from "@/database/modules/BankAccounts/bankAccountService";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import React, { createContext, useContext, useState } from "react";

type BankAccountsContextType = {
  accounts: BankAccount[];
  isLoading: boolean;
  error: string | null;
};

const BankAccountsContext = createContext<BankAccountsContextType | undefined>(
  undefined
);

const bankAccountService = new BankAccountService();

export function BankAccountsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  const value: BankAccountsContextType = {
    accounts,
    isLoading,
    error,
  };

  return (
    <BankAccountsContext.Provider value={value}>
      {children}
    </BankAccountsContext.Provider>
  );
}

export function useBankAccounts() {
  const context = useContext(BankAccountsContext);
  if (context === undefined) {
    throw new Error(
      "useBankAccounts must be used within a BankAccountsProvider"
    );
  }
  return context;
}

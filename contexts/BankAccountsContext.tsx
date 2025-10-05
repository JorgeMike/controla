// contexts/BankAccountsContext.tsx
import { BankAccountService } from "@/database/modules/BankAccounts/bankAccountService";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

type BankAccountsContextType = {
  accounts: BankAccount[];
  isLoading: boolean;
  error: string | null;

  loadAccounts: () => Promise<void>;
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
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ useEffect: Carga cuando user esté disponible
  useEffect(() => {
    if (user?.id) {
      loadAccounts();
    }
  }, [user?.id]);

  const loadAccounts = async () => {
    if (!user) {
      setAccounts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const fetchedAccounts = await bankAccountService.getAllByUserId(user.id);
      console.log("Fetched bank accounts:", fetchedAccounts);
      setAccounts(fetchedAccounts);
      setError(null);
    } catch (err) {
      console.error("Error loading bank accounts:", err);
      setError("Failed to load bank accounts.");
    } finally {
      setIsLoading(false);
    }
  };

  const value: BankAccountsContextType = {
    accounts,
    isLoading,
    error,
    loadAccounts,
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

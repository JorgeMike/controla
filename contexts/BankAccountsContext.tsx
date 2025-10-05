// contexts/BankAccountsContext.tsx
import { BankAccountService } from "@/database/modules/BankAccounts/bankAccountService";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import { NewBankAccount } from "@/database/modules/BankAccounts/bankAccountsTypes";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

type BankAccountsContextType = {
  accounts: BankAccount[];
  isLoading: boolean;
  error: string | null;

  loadAccounts: () => Promise<void>;
  createAccount: (account: NewBankAccount) => Promise<void>;
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
  const router = useRouter();
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
      setAccounts(fetchedAccounts);
      setError(null);
    } catch (err) {
      console.error("Error loading bank accounts:", err);
      setError("Failed to load bank accounts.");
    } finally {
      setIsLoading(false);
    }
  };

  const createAccount = async (account: NewBankAccount) => {
    try {
      await bankAccountService.create(account);
      loadAccounts();
    } catch (error) {
      console.error("Error creating bank account:", error);
      setError("Failed to create bank account.");
    }
  };

  const value: BankAccountsContextType = {
    accounts,
    isLoading,
    error,
    loadAccounts,
    createAccount,
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

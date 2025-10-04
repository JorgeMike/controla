// contexts/BankAccountsContext.tsx
import { BankAccountService } from "@/database/modules/BankAccounts/bankAccountService";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./UserContext";

type BankAccountCounts = {
  total: number;
  active: number;
  inactive: number;
  byType: {
    checking: number;
    savings: number;
    cash: number;
    credit_card: number;
  };
};

type BankAccountsContextType = {
  accounts: BankAccount[];
  counts: BankAccountCounts | null;
  isLoading: boolean;
  error: string | null;

  // Métodos para manipular cuentas
  refreshAccounts: () => Promise<void>;
  addAccount: (
    account: Omit<BankAccount, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateAccount: (id: number, account: Partial<BankAccount>) => Promise<void>;
  deleteAccount: (id: number) => Promise<void>;
  getAccountById: (id: number) => BankAccount | undefined;
  getActiveAccounts: () => BankAccount[];
  getTotalBalance: () => number;
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
  const [counts, setCounts] = useState<BankAccountCounts | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar cuentas
  const loadAccounts = useCallback(async () => {
    if (!user?.id) {
      setAccounts([]);
      setCounts(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Cargar cuentas y conteos en paralelo
      const fetchedAccounts = await bankAccountService.getByUserId(user.id);

      console.log("Fetched accounts:", fetchedAccounts);

      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error("Error loading bank accounts:", error);
      setError("Error al cargar las cuentas bancarias");
      setAccounts([]);
      setCounts(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Cargar cuentas cuando cambia el usuario
  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  // Refrescar cuentas manualmente
  const refreshAccounts = useCallback(async () => {
    await loadAccounts();
  }, [loadAccounts]);

  // Agregar cuenta
  const addAccount = useCallback(
    async (
      accountData: Omit<BankAccount, "id" | "created_at" | "updated_at">
    ) => {
      if (!user?.id) throw new Error("Usuario no autenticado");

      try {
        await bankAccountService.create({ ...accountData, user_id: user.id });
        await refreshAccounts();
      } catch (error) {
        console.error("Error adding account:", error);
        throw error;
      }
    },
    [user?.id, refreshAccounts]
  );

  // Actualizar cuenta
  const updateAccount = useCallback(
    async (id: number, accountData: Partial<BankAccount>) => {
      try {
        await bankAccountService.update(id, accountData);
        await refreshAccounts();
      } catch (error) {
        console.error("Error updating account:", error);
        throw error;
      }
    },
    [refreshAccounts]
  );

  // Eliminar cuenta
  const deleteAccount = useCallback(
    async (id: number) => {
      try {
        await bankAccountService.delete(id);
        await refreshAccounts();
      } catch (error) {
        console.error("Error deleting account:", error);
        throw error;
      }
    },
    [refreshAccounts]
  );

  // Obtener cuenta por ID
  const getAccountById = useCallback(
    (id: number) => {
      return accounts.find((account) => account.id === id);
    },
    [accounts]
  );

  // Obtener solo cuentas activas
  const getActiveAccounts = useCallback(() => {
    return accounts.filter((account) => account.is_active);
  }, [accounts]);

  // Calcular balance total
  const getTotalBalance = useCallback(() => {
    return accounts
      .filter((account) => account.is_active)
      .reduce((sum, account) => sum + account.current_balance, 0);
  }, [accounts]);

  const value: BankAccountsContextType = {
    accounts,
    counts,
    isLoading,
    error,
    refreshAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getAccountById,
    getActiveAccounts,
    getTotalBalance,
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

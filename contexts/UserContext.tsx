import { User } from "@/database/modules/Users/usersSchema";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loadUser: (userId: number) => Promise<void>;
  createUser: (
    userData: Omit<User, "id" | "created_at" | "updated_at">
  ) => Promise<User>;
  updateUser: (userId: number, userData: Partial<User>) => Promise<void>;
  updateBalance: (userId: number, newBalance: number) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}

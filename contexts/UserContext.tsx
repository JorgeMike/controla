// contexts/UserContext.tsx
import { User } from "@/database/modules/Users/usersSchema";
import { UserService } from "@/database/modules/Users/usersService";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  loadUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
const userService = new UserService();

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      console.log("Loading user...");
      setIsLoading(true);
      const currentUser = await userService.getCurrent();
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/onboarding"); // Redirigir al onboarding si no hay usuario
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Aquí puedes agregar lógica de logout si es necesario
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <UserContext.Provider
      value={{ user, isLoading, setUser, logout, refreshUser, loadUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

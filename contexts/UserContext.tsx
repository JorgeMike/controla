// contexts/UserContext.tsx
import { User } from "@/database/modules/Users/usersSchema";
import { UserService } from "@/database/modules/Users/usersService";
import { NewUser } from "@/database/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  allUsers: User[];
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  createUser: (userData: NewUser) => Promise<number>;
  updateUser: (userId: number, userData: Partial<NewUser>) => Promise<void>;
  switchUser: (userId: number) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const userService = new UserService();

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const [currentUser, users] = await Promise.all([
        userService.getCurrent(),
        userService.getAll(),
      ]);

      setUser(currentUser);
      setAllUsers(users);
    } catch (error) {
      console.error("❌ Error refreshing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: NewUser): Promise<number> => {
    try {
      const userId = await userService.create(userData);
      await refreshUser();
      return userId;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  };

  const updateUser = async (
    userId: number,
    userData: Partial<NewUser>
  ): Promise<void> => {
    try {
      await userService.update(userId, userData);
      await refreshUser();
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw error;
    }
  };

  const switchUser = async (userId: number): Promise<void> => {
    try {
      await userService.switchCurrentUser(userId);
      await refreshUser();
    } catch (error) {
      console.error("❌ Error switching user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId: number): Promise<void> => {
    try {
      await userService.delete(userId);
      await refreshUser();
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        isLoading,
        refreshUser,
        createUser,
        updateUser,
        switchUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

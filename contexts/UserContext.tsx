import { userRepository } from "@/database/modules/Users/usersRepository";
import { User } from "@/database/modules/Users/usersSchema";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  getCurrentUser: () => Promise<void>;
  user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = async () => {
    try {
      const user = await userRepository.getCurrent();
      console.log("Usuario actual cargado:", user);
      setUser(user);
    } catch (error) {
      console.error("Error loading current user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ getCurrentUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

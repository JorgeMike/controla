import { userRepository } from "@/database/repositories/userRepository";
import { User, UserSettings } from "@/database/schema";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      setLoading(true);
      const currentUser = await userRepository.getCurrent();
      setUser(currentUser);

      if (currentUser) {
        const userSettings = await userRepository.getSettings(currentUser.id);
        setSettings(userSettings);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    updates: Partial<Omit<User, "id" | "created_at" | "updated_at">>
  ) => {
    if (!user) return;

    try {
      await userRepository.update(user.id, updates);
      await loadUser();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const updateSettings = async (
    updates: Partial<Omit<UserSettings, "user_id">>
  ) => {
    if (!user) return;

    try {
      await userRepository.updateSettings(user.id, updates);
      await loadUser();
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    settings,
    loading,
    updateUser,
    updateSettings,
    reload: loadUser,
  };
};

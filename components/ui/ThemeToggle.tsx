// components/ThemeToggle.tsx
import { useAppTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={theme === "dark" ? "sunny" : "moon"}
        size={24}
        color={theme === "dark" ? "#FFD700" : "#4A5568"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
  },
});

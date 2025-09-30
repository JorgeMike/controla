// components/ThemeToggle.tsx
import { ThemeType, useAppTheme } from "@/contexts/ThemeContext";
import { StyleSheet } from "react-native";
import ModalSelect, { ModalSelectOption } from "./ModalSelect";

export default function ThemeToggle() {
  const { theme, setThemeMode } = useAppTheme();

  const themes: ModalSelectOption<ThemeType>[] = [
    { label: "Claro", value: "light", icon: "sunny" },
    { label: "Oscuro", value: "dark", icon: "moon" },
    { label: "Sistema", value: "auto", icon: "settings" },
  ];

  return (
    <ModalSelect
      label="Tema"
      theme={theme}
      options={themes}
      selectedValue={theme}
      onValueChange={setThemeMode}
      placeholder="Selecciona un tema"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
  },
});

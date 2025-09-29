import Container from "@/components/Container";
import { useAppTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import Actionbutton from "./ui/Actionbutton";

export default function ExpenseIncomeSummary() {
  const { theme } = useAppTheme() ?? "light";

  return (
    <Container style={styles.container}>
      {/* Gastos */}
      <Actionbutton title="Agregar Gastos" iconName="cash" theme={theme} />

      {/* Separador */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor:
              theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          },
        ]}
      />

      <Actionbutton title="Agregar Ingresos" iconName="cash" theme={theme} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 8,
  },
});

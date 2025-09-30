import Container from "@/components/Container";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import Actionbutton from "./ui/ActionButton";

export default function ExpenseIncomeSummary() {
  const { theme } = useAppTheme() ?? "light";

  return (
    <Container style={styles.container}>
      {/* Gastos */}
      <Actionbutton
        title="Agregar Gastos"
        iconName="cash"
        theme={theme}
        iconColor={Colors[theme].warning}
        onPress={() => {
          console.log("Agregar Gastos");
        }}
      />

      {/* Separador */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor: Colors[theme].text + "20",
          },
        ]}
      />

      <Actionbutton
        title="Agregar Ingresos"
        iconName="cash"
        theme={theme}
        iconColor={Colors[theme].warning}
        onPress={() => {
          console.log("Agregar Ingresos");
        }}
      />
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

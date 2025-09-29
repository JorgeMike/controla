import Container from "@/components/Container";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";
import Actionbutton from "./ui/Actionbutton";

export default function ExpenseIncomeSummary() {
  const theme = useColorScheme() ?? "light";

  return (
    <Container style={styles.container}>
      {/* Gastos */}
      <Actionbutton theme={theme} />

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

      <Actionbutton theme={theme} />
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

import { ScrollView, StyleSheet } from "react-native";

import Container from "@/components/Container";
import { Text } from "@/components/Themed";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState("");
  const { theme = "light", setThemeMode } = useAppTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: Colors[theme].background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container style={styles.container}>
        <Text type="h1" style={{ marginVertical: 25 }}>
          Configuración
        </Text>
        <ThemeToggle />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

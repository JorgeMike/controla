import { ScrollView } from "react-native";

import Container from "@/components/Container";
import { Text } from "@/components/Themed";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();

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
      <Container>
        <Text type="h1" style={{ marginVertical: 25 }}>
          Configuración
        </Text>

        <ThemeToggle />
      </Container>
    </ScrollView>
  );
}

import { ScrollView } from "react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import { Text } from "@/components/Themed";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";

export default function TabTwoScreen() {
  const { theme } = useAppTheme();
  const { user, isLoading: isLoadingUser } = useUser();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background, // Mover aquí
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Header theme={theme} image={user?.profile_image} />

        <Text type="h1" style={{ marginTop: 20 }}>
          Configuración
        </Text>

        <ThemeToggle />
      </Container>
    </ScrollView>
  );
}

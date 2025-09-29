import { ScrollView, StyleSheet } from "react-native";

import ActionButtons from "@/components/ActionButtons";
import Container from "@/components/Container";
import Greetings from "@/components/Greetings";
import Header from "@/components/Header";
import { Text } from "@/components/Themed";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme() ?? "light";

  return (
    <LinearGradient
      colors={[Colors[theme].primary, "transparent"]}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20, // Padding extra al final
        }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Header theme={theme} />
          <Greetings />
          <SummaryTitle theme={theme} title="Total" amount="$15,130.15" />
        </Container>

        <ActionButtons />

        <Container>
          <Text type="h3" lightColor="#ffffff">
            Últimos Movimientos
          </Text>
          <SummaryTitle
            theme={theme}
            iconName="cash"
            title="Ingreso"
            amount="$8,000"
          />
          <SummaryTitle
            theme={theme}
            iconName="wallet"
            title="Salario"
            amount="$3,500"
          />
          <SummaryTitle
            theme={theme}
            iconName="laptop"
            title="Trabajo Freelance"
            amount="$1,200"
          />
          <SummaryTitle
            theme={theme}
            iconName="pricetag"
            title="Venta"
            amount="$450"
          />
          <SummaryTitle
            theme={theme}
            iconName="trending-up"
            title="Rendimientos"
            amount="$285"
          />
          <SummaryTitle
            theme={theme}
            iconName="arrow-undo"
            title="Reembolso"
            amount="$120"
          />
          <SummaryTitle
            theme={theme}
            iconName="gift"
            title="Bono"
            amount="$500"
          />
        </Container>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

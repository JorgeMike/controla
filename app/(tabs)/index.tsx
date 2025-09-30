import { ScrollView } from "react-native";

import ActionButtons from "@/components/ActionButtons";
import Container from "@/components/Container";
import Greetings from "@/components/Greetings";
import Header from "@/components/Header";
import SummaryCarousel, { SummaryItem } from "@/components/SummaryCarousel";
import { Text } from "@/components/Themed";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme() ?? "light";

  // Datos para el carrusel
  const summaryData: SummaryItem[] = [
    {
      title: "Total",
      amount: "$15,130.15",
      iconName: "wallet",
      iconColor: Colors[theme].secondary,
    },
    {
      title: "Ingresos del Mes",
      amount: "$8,500.00",
      iconName: "trending-up",
      iconColor: Colors[theme].success,
    },
    {
      title: "Gastos del Mes",
      amount: "$3,250.00",
      iconName: "trending-down",
      iconColor: Colors[theme].danger,
    },
  ];

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
        <Header theme={theme} />
        <Greetings />
        <SummaryCarousel theme={theme} data={summaryData} />
      </Container>

      <ActionButtons />

      <Container style={{ gap: 15 }}>
        <Text type="h3">Últimos Movimientos</Text>
        <SummaryTitle
          theme={theme}
          iconName="cash"
          title="Ingreso"
          amount="$8,000"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
        <SummaryTitle
          theme={theme}
          iconName="wallet"
          title="Salario"
          amount="$3,500"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
        <SummaryTitle
          theme={theme}
          iconName="laptop"
          title="Trabajo Freelance"
          amount="$1,200"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
        <SummaryTitle
          theme={theme}
          iconName="pricetag"
          title="Venta"
          amount="$450"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
        <SummaryTitle
          theme={theme}
          iconName="trending-up"
          title="Rendimientos"
          amount="$285"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].secondary}
        />
        <SummaryTitle
          theme={theme}
          iconName="arrow-undo"
          title="Reembolso"
          amount="$120"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
        <SummaryTitle
          theme={theme}
          iconName="gift"
          title="Bono"
          amount="$500"
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].success}
        />
      </Container>
    </ScrollView>
  );
}

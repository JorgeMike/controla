import { View as RNView, ScrollView } from "react-native";

import ActionButtons from "@/components/ActionButtons";
import Container from "@/components/Container";
import Greetings from "@/components/Greetings";
import Header from "@/components/Header";
import EmptyAccountsState from "@/components/Screens/EmptyAccountsState";
import SummaryCarousel, { SummaryItem } from "@/components/SummaryCarousel";
import { Text } from "@/components/Themed";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";

export default function HomeScreen() {
  const { theme } = useAppTheme() ?? "light";
  const { user, isLoading: isLoadingUser } = useUser();
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts();

  // Loading global: esperamos user Y cuentas
  if (isLoadingUser || isLoadingAccounts) {
    return <LoadingIndicator />;
  }

  // Empty State: usuario sin cuentas
  if (accounts.length === 0) {
    return (
      <RNView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
        <Container>
          <Header theme={theme} image={user?.profile_image} />
          <Greetings name={user?.name.split(" ")[0]} />
        </Container>
        <EmptyAccountsState theme={theme} />
      </RNView>
    );
  }

  // Calcular totales (luego mover a hook custom)
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.current_balance,
    0
  );

  const summaryData: SummaryItem[] = [
    {
      title: "Total",
      amount: `${user?.currency_symbol}${totalBalance.toFixed(2)}`,
      iconName: "wallet",
      iconColor: Colors[theme].blue,
    },
    {
      title: "Ingresos del Mes",
      amount: `${user?.currency_symbol}8,500.00`, // TODO: calcular real
      iconName: "trending-up",
      iconColor: Colors[theme].green,
    },
    {
      title: "Gastos del Mes",
      amount: `${user?.currency_symbol}3,250.00`, // TODO: calcular real
      iconName: "trending-down",
      iconColor: Colors[theme].red,
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors[theme].background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Header theme={theme} image={user?.profile_image} />
        <Greetings name={user?.name.split(" ")[0]} />
        <SummaryCarousel theme={theme} data={summaryData} />
      </Container>

      <ActionButtons />

      <Container style={{ gap: 15 }}>
        <Text type="h3">Últimos Movimientos</Text>
        <SummaryTitle
          theme={theme}
          iconName="cash"
          title="Ingreso"
          amount={`${user?.currency_symbol}8,000`}
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].green}
        />
        <SummaryTitle
          theme={theme}
          iconName="wallet"
          title="Salario"
          amount={`${user?.currency_symbol}3,500`}
          amountType="h5"
          titleType="bodyXS"
          iconColor={Colors[theme].green}
        />
      </Container>
    </ScrollView>
  );
}

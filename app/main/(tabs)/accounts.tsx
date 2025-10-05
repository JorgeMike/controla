import { View as RNView, ScrollView } from "react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import EmptyAccountsState from "@/components/Screens/EmptyAccountsState";
import { Text, View } from "@/components/Themed";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { user, isLoading: isLoadingUser } = useUser();
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts();

  // Empty State: usuario sin cuentas
  if (accounts.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
        <Container style={{ paddingTop: insets.top }}>
          <Header theme={theme} image={user?.profile_image} />
          <Text type="h1" style={{ marginTop: 20 }}>
            Mis Cuentas
          </Text>
        </Container>
        <EmptyAccountsState theme={theme} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background, // Mover aquí
      }}
      contentContainerStyle={{
        flexGrow: 1, // Cambiar de paddingTop a flexGrow
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Header theme={theme} image={user?.profile_image} />
        <RNView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text type="h1">Mis Cuentas</Text>
          <Link href="/main/add-account" asChild>
            <Ionicons
              name="add"
              size={24}
              color={Colors[theme].text}
              style={{
                backgroundColor: Colors[theme].blue,
                borderRadius: 12,
                padding: 4,
              }}
            />
          </Link>
        </RNView>

        {accounts.map((account) => (
          <SummaryTitle
            theme={theme}
            iconColor={Colors[theme][account.color ?? "card"]}
            iconName={account.icon}
            amount={`$${account.current_balance.toFixed(2)}`}
            title={account.name}
            key={account.id}
            style={{ marginTop: 20 }}
          />
        ))}
      </Container>
    </ScrollView>
  );
}

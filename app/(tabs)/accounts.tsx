import { ScrollView } from "react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import EmptyAccountsState from "@/components/Screens/EmptyAccountsState";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
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
        <Text type="h1" style={{ marginTop: 20 }}>
          Mis Cuentas
        </Text>
      </Container>
    </ScrollView>
  );
}

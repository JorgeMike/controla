import { View as RNView, ScrollView, StyleSheet } from "react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import AccountDetailsSheet from "@/components/Screens/AccountDetailsSheet";
import EmptyAccountsState from "@/components/Screens/EmptyAccountsState";
import { Text, View } from "@/components/Themed";
import PressableSummaryTitle from "@/components/ui/PressableSummaryTitle";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { user, isLoading: isLoadingUser } = useUser();
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null
  );
  const snapPoints = useMemo(() => ["34%", "75%", "90%"], []);

  const handleOpenBottomSheet = useCallback((account: BankAccount) => {
    setSelectedAccount(account);
    bottomSheetRef.current?.expand();
  }, []);

  // Empty State: usuario sin cuentas
  if (accounts.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
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
                color="#000000"
                style={{
                  backgroundColor: Colors[theme].blue,
                  borderRadius: 12,
                  padding: 4,
                }}
              />
            </Link>
          </RNView>
        </Container>
        <EmptyAccountsState theme={theme} />
      </View>
    );
  }

  return (
    <RNView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors[theme].background,
        }}
        contentContainerStyle={{
          flexGrow: 1,
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
                color="#ffffff"
                style={{
                  backgroundColor: Colors[theme].blue,
                  borderRadius: 12,
                  padding: 4,
                }}
              />
            </Link>
          </RNView>

          {accounts.map((account) => (
            <PressableSummaryTitle
              onPress={() => handleOpenBottomSheet(account)}
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: Colors[theme].surface,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[theme].text,
        }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {selectedAccount && (
            <AccountDetailsSheet account={selectedAccount} theme={theme} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </RNView>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    padding: 24,
  },
  accountHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  accountName: {
    textAlign: "center",
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

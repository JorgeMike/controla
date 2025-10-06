import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { BankAccount } from "@/database/modules/BankAccounts/bankAccountsSchema";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View as RNView, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";

interface AccountDetailsSheetProps {
  account: BankAccount;
  theme: "light" | "dark";
}

export default function AccountDetailsSheet({
  account,
  theme,
}: AccountDetailsSheetProps) {
  console.log(account);
  return (
    <>
      <RNView style={styles.accountHeader}>
        <RNView
          style={[
            styles.iconContainer,
            {
              backgroundColor: Colors[theme][account.color ?? "blue"],
              padding: 8,
              borderRadius: 10,
            },
          ]}
        >
          <Ionicons
            name={account.icon}
            size={32}
            style={{ color: Colors[theme].textInverse }}
          />
        </RNView>
        <Text type="h2" style={styles.accountName}>
          {account.name}
        </Text>
      </RNView>

      <RNView style={styles.balanceContainer}>
        <Text type="h6" style={{ opacity: 0.6 }}>
          Saldo actual
        </Text>
        <Text type="h1">
          {account.currency_symbol}
          {account.current_balance.toFixed(2)} {account.currency}
        </Text>
      </RNView>

      <RNView style={styles.detailsContainer}>
        <View variant="background" style={styles.detailRow}>
          <Text type="bodyL" style={{ opacity: 0.6 }}>
            Saldo inicial:
          </Text>
          <Text type="bodyL">
            {account.currency_symbol}
            {account.initial_balance.toFixed(2)}
          </Text>
        </View>

        <RNView style={styles.detailRow}>
          <Text type="bodyL" style={{ opacity: 0.6 }}>
            Estado:
          </Text>
          <Switch
            value={account.is_active === 1 ? true : false}
            disabled
            color={Colors[theme].blue}
            theme={{
              colors: {
                surface: Colors[theme].blue,
              },
            }}
            thumbColor={Colors[theme][account.color ?? "blue"]}
            trackColor={{
              true: Colors[theme][account.color ?? "blue"] + "55",
            }}
          />
        </RNView>
      </RNView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

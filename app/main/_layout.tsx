// app/_layout.tsx
import Colors from "@/constants/Colors";
import { BankAccountsProvider } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { theme } = useAppTheme();

  return (
    <BankAccountsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add-account"
          options={{
            headerShown: true,
            headerTitle: "Agregar Cuenta",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors[theme].background,
            },
          }}
        />
      </Stack>
    </BankAccountsProvider>
  );
}

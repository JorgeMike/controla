import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import Colors from "@/constants/Colors";
import { BankAccountsProvider } from "@/contexts/BankAccountsContext";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { useColorScheme } from "@/hooks/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log("Tabs layout mounted");
  }, []);

  return (
    <BankAccountsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].blue,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Cuentas",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: "Configuración",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          }}
        />
      </Tabs>
    </BankAccountsProvider>
  );
}

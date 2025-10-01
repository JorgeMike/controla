import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { clearDatabase } from "@/database/database";
import { userRepository } from "@/database/modules/Users/usersRepository";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(onboarding)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const segments = useSegments();
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Inicializar base de datos
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await clearDatabase();
        setDatabaseInitialized(true);
      } catch (error) {
        console.error("Error setting up database:", error);
      }
    };

    setupDatabase();
  }, []);

  // Manejar navegación basada en onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!databaseInitialized) return;

      const user = await userRepository.getCurrent();

      if (!user && segments[0] !== "(onboarding)") {
        router.replace("/(onboarding)");
      } else if (user && segments[0] === "(onboarding)") {
        router.replace("/(tabs)");
      }
    };

    if (!loaded) {
      return;
    }

    checkOnboardingStatus();

    SplashScreen.hideAsync();
  }, [loaded]);

  // Mostrar loading mientras se inicializa todo
  const isReady = loaded;

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="profile"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Perfil",
            }}
          />
          <Stack.Screen
            name="add-expense"
            options={{
              headerShown: true,
              headerTitle: "Agregar Gasto",
            }}
          />
        </Stack>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </GestureHandlerRootView>
    </NavigationThemeProvider>
  );
}

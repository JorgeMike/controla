import { ONBOARDING_KEY } from "@/constants/keys";
import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { initDatabase } from "@/database/database";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appState, setAppState] = useState({
    dbInitialized: false,
    onboardingChecked: false,
    hasCompletedOnboarding: false,
  });

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
        await initDatabase();
        setAppState((prev) => ({ ...prev, dbInitialized: true }));
      } catch (error) {
        console.error("Error setting up database:", error);
      }
    };

    setupDatabase();
  }, []);

  // Verificar onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
        setAppState((prev) => ({
          ...prev,
          onboardingChecked: true,
          hasCompletedOnboarding: completed === "true",
        }));
      } catch (error) {
        console.error("Error checking onboarding:", error);
        setAppState((prev) => ({ ...prev, onboardingChecked: true }));
      }
    };

    checkOnboarding();
  }, []);

  // Manejar navegación basada en onboarding
  useEffect(() => {
    if (!appState.onboardingChecked || !appState.dbInitialized || !loaded) {
      return;
    }

    const inOnboarding = segments[0] === "(onboarding)";

    if (appState.hasCompletedOnboarding && inOnboarding) {
      router.replace("/(tabs)");
    } else if (!appState.hasCompletedOnboarding && !inOnboarding) {
      router.replace("/(onboarding)");
    }

    // Ocultar splash screen cuando todo esté listo
    SplashScreen.hideAsync();
  }, [
    appState.onboardingChecked,
    appState.hasCompletedOnboarding,
    appState.dbInitialized,
    loaded,
    segments,
  ]);

  // Mostrar loading mientras se inicializa todo
  const isReady =
    loaded && appState.dbInitialized && appState.onboardingChecked;

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

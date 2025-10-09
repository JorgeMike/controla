// app/_layout.tsx
import Colors from "@/constants/Colors";
import { ONBOARDING_KEY } from "@/constants/keys";
import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { initDatabase } from "@/database/database";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Solo inicializar la DB una vez
  useEffect(() => {
    async function prepare() {
      try {
        if (!loaded) return;

        await initDatabase();
        //await clearDatabase(); // Para desarrollo, limpiar DB cada vez
        console.log("✅ Database initialized");

        setDbInitialized(true);
      } catch (error) {
        console.error("❌ Error initializing database:", error);
        // Aún así permitir continuar
        setDbInitialized(true);
      }
    }

    prepare();
  }, [loaded]);

  // Ocultar splash solo cuando DB y fuentes estén listas
  useEffect(() => {
    if (dbInitialized && loaded) {
      // Pequeño delay para asegurar que UserProvider cargue
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [dbInitialized, loaded]);

  if (!dbInitialized || !loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <RootLayoutNav />
      </UserProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { theme } = useAppTheme();

  useEffect(() => {
    const checkOnBoarding = async () => {
      const isOnBoardingCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (!isOnBoardingCompleted) {
        router.replace("/onboarding");
      } else {
        router.replace("/main/(tabs)");
      }
    };

    checkOnBoarding();
  }, []);

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: Colors[theme].background }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="onboarding" />

          <Stack.Screen name="main" />

          <Stack.Screen
            name="profile"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Perfil",
              headerShadowVisible: false,
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

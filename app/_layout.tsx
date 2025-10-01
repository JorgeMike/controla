import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { initDatabase } from "@/database/database";
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
  initialRouteName: "(tabs)",
};

// Prevenir que la splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Manejar errores de carga de fuentes
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Inicializar app: DB + verificar usuario
  useEffect(() => {
    async function initializeApp() {
      try {
        // 1. Esperar a que las fuentes estén cargadas
        if (!loaded) return;

        // 2. Inicializar base de datos
        await initDatabase();

        // 3. Verificar si existe un usuario
        const user = await userRepository.getCurrent();

        // 4. Determinar ruta inicial
        if (user) {
          setInitialRoute("/(tabs)");
        } else {
          setInitialRoute("/(onboarding)");
        }

        // 5. Marcar app como lista
        setAppIsReady(true);
      } catch (error) {
        console.error("Error initializing app:", error);
        // En caso de error, ir a onboarding por defecto
        setInitialRoute("/(onboarding)");
        setAppIsReady(true);
      }
    }

    initializeApp();
  }, [loaded]);

  // Ocultar splash screen cuando todo esté listo
  useEffect(() => {
    if (appIsReady && initialRoute) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, initialRoute]);

  // Mantener splash screen visible hasta que todo esté listo
  if (!appIsReady || !initialRoute) {
    return null;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <RootLayoutNav initialRoute={initialRoute} />
      </UserProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav({ initialRoute }: { initialRoute: string }) {
  const { theme } = useAppTheme();
  const router = useRouter();
  const segments = useSegments();
  const [hasNavigated, setHasNavigated] = useState(false);

  // Navegar a la ruta inicial solo una vez
  useEffect(() => {
    if (!hasNavigated) {
      router.replace(initialRoute as any);
      setHasNavigated(true);
    }
  }, [initialRoute, hasNavigated]);

  // Protección de rutas: prevenir acceso no autorizado
  useEffect(() => {
    const checkAuth = async () => {
      if (!hasNavigated) return;

      const user = await userRepository.getCurrent();
      const inOnboarding = segments[0] === "(onboarding)";
      const inTabs = segments[0] === "(tabs)";

      // Si no hay usuario y está en tabs, redirigir a onboarding
      if (!user && inTabs) {
        router.replace("/(onboarding)");
      }
      // Si hay usuario y está en onboarding, redirigir a tabs
      else if (user && inOnboarding) {
        router.replace("/(tabs)");
      }
    };

    checkAuth();
  }, [segments, hasNavigated]);

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

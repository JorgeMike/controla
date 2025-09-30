import Container from "@/components/Container";
import { Text } from "@/components/Themed";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { user, settings, loading, updateUser, updateSettings } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [monthlyBudget, setMonthlyBudget] = useState(
    user?.monthly_budget?.toString() || ""
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors[theme].background,
        }}
      >
        <ActivityIndicator size="large" color={Colors[theme].text} />
      </View>
    );
  }

  const handleSave = async () => {
    try {
      await updateUser({
        name: name || "Usuario",
        email: email || undefined,
        monthly_budget: monthlyBudget ? parseFloat(monthlyBudget) : undefined,
      });
      alert("Datos guardados correctamente");
    } catch (error) {
      alert("Error al guardar los datos");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Text type="h1" style={{ marginVertical: 25 }}>
          Configuración
        </Text>

        {/* Perfil */}
        <View style={{ marginBottom: 30 }}>
          <Text type="h2" style={{ marginBottom: 15 }}>
            Perfil
          </Text>

          <Text style={{ marginBottom: 5 }}>Nombre</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            style={{
              backgroundColor: Colors[theme].surface,
              padding: 15,
              borderRadius: 10,
              color: Colors[theme].text,
              marginBottom: 15,
            }}
            placeholderTextColor={Colors[theme].surface}
          />

          <Text style={{ marginBottom: 5 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            keyboardType="email-address"
            style={{
              backgroundColor: Colors[theme].surface,
              padding: 15,
              borderRadius: 10,
              color: Colors[theme].text,
              marginBottom: 15,
            }}
            placeholderTextColor={Colors[theme].surface}
          />

          <Text style={{ marginBottom: 5 }}>Presupuesto Mensual</Text>
          <TextInput
            value={monthlyBudget}
            onChangeText={setMonthlyBudget}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={{
              backgroundColor: Colors[theme].surface,
              padding: 15,
              borderRadius: 10,
              color: Colors[theme].text,
              marginBottom: 15,
            }}
            placeholderTextColor={Colors[theme].surface}
          />

          <Text style={{ marginBottom: 5 }}>
            Moneda: {user?.currency} ({user?.currency_symbol})
          </Text>

          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: Colors[theme].text,
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Guardar Cambios
            </Text>
          </TouchableOpacity>
        </View>

        {/* Apariencia */}
        <View style={{ marginBottom: 30 }}>
          <Text type="h2" style={{ marginBottom: 15 }}>
            Apariencia
          </Text>
          <ThemeToggle />
        </View>
      </Container>
    </ScrollView>
  );
}

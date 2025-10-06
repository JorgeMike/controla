import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";

export default function EmptyAccountsState({
  theme,
}: {
  theme: "light" | "dark";
}) {
  const { push } = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: Colors[theme].background,
      }}
    >
      <Ionicons name="wallet-outline" size={80} color={Colors[theme].text} />
      <Text type="h3" style={{ marginTop: 16, textAlign: "center" }}>
        Crea tu primera cuenta
      </Text>
      <Text
        type="bodyL"
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        Necesitas al menos una cuenta bancaria para comenzar a registrar tus
        movimientos
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 24,
          backgroundColor: Colors[theme].surface,
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 12,
        }}
        onPress={() => push("/main/add-account")} // Necesitas crear esta ruta
      >
        <Text style={{ color: Colors[theme].text, fontWeight: "600" }}>
          Crear Cuenta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

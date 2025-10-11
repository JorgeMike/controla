import Container from "@/components/Container";
import { Text } from "@/components/Themed";
import SettingItem from "@/components/ui/SettingItem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { theme } = useAppTheme();
  const { user } = useUser();

  if (!user) return null;

  return (
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
        {/* Header con foto de perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user.profile_image ? (
              <Image
                source={{ uri: user.profile_image }}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: Colors[theme].surfaceVariant },
                ]}
              >
                <Ionicons name="person" size={48} color={Colors[theme].text} />
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.editAvatarButton,
                { backgroundColor: Colors[theme].blue },
              ]}
            >
              <Ionicons name="camera" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text type="h2" style={styles.userName}>
            {user.name}
          </Text>
          {user.email && (
            <Text type="bodyL" style={{ opacity: 0.6 }}>
              {user.email}
            </Text>
          )}
        </View>

        {/* Información de la cuenta */}
        <View style={styles.section}>
          <Text type="h5" style={styles.sectionTitle}>
            Información de la cuenta
          </Text>

          <SettingItem
            theme={theme}
            iconName="cash-outline"
            title="Moneda predeterminada"
            subtitle={`${user.currency} (${user.currency_symbol})`}
            onPress={() => console.log("Cambiar moneda")}
          />

          <SettingItem
            theme={theme}
            iconName="person-outline"
            title="Editar perfil"
            subtitle="Nombre, email y más"
            onPress={() => console.log("Editar perfil")}
          />
        </View>

        {/* Apariencia */}
        <View style={styles.section}>
          <Text type="h5" style={styles.sectionTitle}>
            Apariencia
          </Text>
          <ThemeToggle />
        </View>

        {/* Configuración adicional */}
        <View style={styles.section}>
          <Text type="h5" style={styles.sectionTitle}>
            Más opciones
          </Text>

          <SettingItem
            theme={theme}
            iconName="notifications-outline"
            title="Notificaciones"
            onPress={() => console.log("Notificaciones")}
          />

          <SettingItem
            theme={theme}
            iconName="shield-checkmark-outline"
            title="Seguridad y privacidad"
            onPress={() => console.log("Seguridad")}
          />

          <SettingItem
            theme={theme}
            iconName="help-circle-outline"
            title="Ayuda y soporte"
            onPress={() => console.log("Ayuda")}
          />
        </View>

        {/* Información de la app */}
        <View style={styles.appInfo}>
          <Text type="caption" style={{ opacity: 0.4, textAlign: "center" }}>
            Controla v1.0.0
          </Text>
          <Text type="caption" style={{ opacity: 0.4, textAlign: "center" }}>
            Cuenta creada el{" "}
            {new Date(user.created_at).toLocaleDateString("es-ES")}
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  userName: {
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    opacity: 0.6,
  },
  appInfo: {
    marginTop: 32,
    marginBottom: 16,
    gap: 4,
  },
});

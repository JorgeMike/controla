import {
  View as DefaultView,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

import Container from "@/components/Container";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import DateUtils from "@/utils/date-uitls";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? "light";

  return (
    <View>
      <LinearGradient
        colors={["#4A90E2", "#4ADE80"]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0.5, y: 0 }}
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          borderRadius: 20,
        }}
      >
        <Container>
          <DefaultView
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <DefaultView
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.15)",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backdropFilter: "blur(8px)",
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <Text type="defaultSemiBold">
                {DateUtils.formatDate(new Date(), {
                  showDay: true,
                  showMonth: true,
                })}
              </Text>
            </DefaultView>
            <DefaultView style={{ flexDirection: "row" }}>
              <Link href="/profile" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications-circle"
                      size={36}
                      style={{
                        marginRight: 12,
                        opacity: pressed ? 0.5 : 1,
                        color: Colors[theme].text,
                      }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/profile" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Image
                      source={require("../../assets/avatars/avatar.png")}
                      style={{
                        marginRight: 20,
                        opacity: pressed ? 0.5 : 1,
                        width: 36,
                        height: 36,
                        borderRadius: 15,
                      }}
                    />
                  )}
                </Pressable>
              </Link>
            </DefaultView>
          </DefaultView>
          <DefaultView>
            <Text type="title" style={{ marginTop: 25 }}>
              ¡Hola,{" "}
              <Text type="title" style={{ fontWeight: "600" }}>
                Michael
              </Text>
              !
            </Text>
            <Text type="defaultSemiBold" style={{ marginTop: 5, opacity: 0.9 }}>
              Este es tu resumen de septiembre.
            </Text>
          </DefaultView>
        </Container>
      </LinearGradient>
      <Container>
        <Text>Tab One</Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

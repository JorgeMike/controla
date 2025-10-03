import Colors from "@/constants/Colors";
import DateUtils from "@/utils/date-uitls";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View as DefaultView, Image, Pressable } from "react-native";
import { Text } from "./Themed";

export default function Header({
  theme,
  image,
}: {
  theme: "light" | "dark";
  image?: string;
}) {
  return (
    <DefaultView
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <DefaultView
        style={{
          backgroundColor: Colors[theme].background + "50",
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
                source={{
                  uri: image,
                }}
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
  );
}

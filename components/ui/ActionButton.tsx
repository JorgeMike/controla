import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View as DefaultView, Pressable, StyleSheet } from "react-native";
import { Text, textVariants, View } from "../Themed";

export interface ActionbuttonProps {
  theme: "light" | "dark";

  title: string;
  titleType?: keyof typeof textVariants;
  onPress: () => void;

  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
}

export default function Actionbutton({
  theme,
  title,
  onPress,
  titleType = "h5",
  iconName = "wallet",
  iconColor = Colors[theme].text,
}: ActionbuttonProps) {
  return (
    <Pressable style={styles.summaryCard} onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.cardContent, { opacity: pressed ? 0.8 : 1 }]}>
          <DefaultView
            style={{
              backgroundColor: iconColor + "25",
              padding: 8,
              borderRadius: 50,
              marginBottom: 8,
            }}
          >
            <Ionicons name={iconName} size={20} color={iconColor} />
          </DefaultView>
          <Text type={titleType}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
  },
  cardContent: {
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});

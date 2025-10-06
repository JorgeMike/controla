import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export interface SettingItemProps {
  theme: "light" | "dark";
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
}

export default function SettingItem({
  theme,
  iconName,
  title,
  subtitle,
  onPress,
  showChevron = true,
  rightElement,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: Colors[theme].card }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.leftContent}>
        <Ionicons name={iconName} size={24} color={Colors[theme].text} />
        <View style={styles.textContainer}>
          <Text type="bodyL">{title}</Text>
          {subtitle && (
            <Text type="caption" style={{ opacity: 0.6 }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightElement ? (
        rightElement
      ) : showChevron ? (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors[theme].text}
          style={{ opacity: 0.4 }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
});

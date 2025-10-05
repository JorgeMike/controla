import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IconPickerProps {
  icons: React.ComponentProps<typeof Ionicons>["name"][];
  selectedIcon: React.ComponentProps<typeof Ionicons>["name"];
  onIconChange: (
    iconName: React.ComponentProps<typeof Ionicons>["name"]
  ) => void;
  label?: string;
  theme?: "light" | "dark";
  maxHeight?: number;
}

export default function IconPicker({
  icons,
  selectedIcon,
  onIconChange,
  label,
  theme = "light",
  maxHeight = 200,
}: IconPickerProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        style={[styles.scrollView, { maxHeight }]}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.iconsGrid}>
          {icons.map((iconName) => (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconBox,
                selectedIcon === iconName && {
                  borderColor: Colors[theme].blue,
                  borderWidth: 3,
                  backgroundColor: Colors[theme].background,
                },
              ]}
              onPress={() => onIconChange(iconName)}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={
                  selectedIcon === iconName
                    ? Colors[theme].blue
                    : Colors[theme].text
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  scrollView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    padding: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

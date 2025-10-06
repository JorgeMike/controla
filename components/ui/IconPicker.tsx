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
      {label && (
        <Text style={[styles.label, { color: Colors[theme].text }]}>
          {label}
        </Text>
      )}
      <ScrollView
        style={[
          styles.scrollView,
          {
            maxHeight,
            borderColor: Colors[theme].border,
            backgroundColor: Colors[theme].inputBackground,
          },
        ]}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.iconsGrid}>
          {icons.map((iconName) => {
            const isSelected = selectedIcon === iconName;
            return (
              <TouchableOpacity
                key={iconName}
                style={[
                  styles.iconBox,
                  {
                    borderColor: isSelected
                      ? Colors[theme].blue
                      : Colors[theme].border,
                    borderWidth: isSelected ? 3 : 1,
                    backgroundColor: isSelected
                      ? Colors[theme].surfaceVariant
                      : "transparent",
                    transform: [{ scale: isSelected ? 1.05 : 1 }],
                  },
                ]}
                onPress={() => onIconChange(iconName)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={iconName}
                  size={28}
                  color={isSelected ? Colors[theme].blue : Colors[theme].text}
                />
                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: Colors[theme].blue },
                      ]}
                    >
                      <Ionicons name="checkmark" size={10} color="#fff" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
  },
  scrollView: {
    borderRadius: 8,
    borderWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  checkmarkContainer: {
    position: "absolute",
    top: -4,
    right: -4,
  },
  checkmark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

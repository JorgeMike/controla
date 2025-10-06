import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ColorOption<T = string> {
  name: T;
  light: string;
  dark: string;
}

interface ColorPickerProps<T = string> {
  colors: ColorOption<T>[];
  selectedColor: T;
  onColorChange: (colorName: T) => void;
  label?: string;
  theme?: "light" | "dark";
}

export default function ColorPicker<T = string>({
  colors,
  selectedColor,
  onColorChange,
  label,
  theme = "light",
}: ColorPickerProps<T>) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: Colors[theme].text }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.wrapper,
          {
            borderColor: Colors[theme].border,
            backgroundColor: Colors[theme].inputBackground,
          },
        ]}
      >
        <View style={styles.colorsGrid}>
          {colors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <TouchableOpacity
                key={String(color.name)}
                style={[
                  styles.colorBox,
                  {
                    borderColor: isSelected
                      ? Colors[theme].blue
                      : "transparent",
                    borderWidth: isSelected ? 3 : 2,
                    transform: [{ scale: isSelected ? 1.1 : 1 }],
                  },
                ]}
                onPress={() => onColorChange(color.name)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.colorHalf,
                    styles.colorHalfLeft,
                    { backgroundColor: color.light },
                  ]}
                />
                <View
                  style={[
                    styles.colorHalf,
                    styles.colorHalfRight,
                    { backgroundColor: color.dark },
                  ]}
                />
                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: Colors[theme].blue },
                      ]}
                    >
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
  wrapper: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 12,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
  },
  colorHalf: {
    flex: 1,
    height: "100%",
  },
  colorHalfLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  colorHalfRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  checkmarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

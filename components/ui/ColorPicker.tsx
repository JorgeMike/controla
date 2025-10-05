import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ColorOption {
  name: string;
  light: string;
  dark: string;
}

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: string; // nombre del color
  onColorChange: (colorName: string) => void;
  label?: string;
  theme?: "light" | "dark";
}

export default function ColorPicker({
  colors,
  selectedColor,
  onColorChange,
  label,
  theme = "light",
}: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.wrapper}>
        <View style={styles.colorsGrid}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.name}
              style={[
                styles.colorBox,
                selectedColor === color.name && {
                  borderColor: Colors[theme].surface,
                  borderWidth: 4,
                },
              ]}
              onPress={() => onColorChange(color.name)}
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
            </TouchableOpacity>
          ))}
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
    color: "#333",
  },
  wrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    overflow: "hidden",
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
});

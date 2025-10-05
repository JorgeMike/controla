import Colors from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ColorVariant = keyof typeof Colors.light;

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ColorVariant;
  theme?: "light" | "dark";
  loading?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
}

export default function Button({
  title,
  variant = "purple",
  theme = "light",
  loading = false,
  fullWidth = false,
  outline = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const getButtonStyle = () => {
    if (disabled || loading) {
      return { backgroundColor: Colors[theme].disabled };
    }

    if (outline) {
      return {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: Colors[theme][variant],
      };
    }

    return { backgroundColor: Colors[theme][variant] };
  };

  const getTextStyle = () => {
    if (disabled || loading) {
      return { color: Colors[theme].placeholder };
    }

    if (outline) {
      return { color: Colors[theme][variant] };
    }

    // Texto blanco para colores oscuros, texto oscuro para surface
    return {
      color:
        variant === "surface" || variant === "surfaceVariant"
          ? Colors[theme].text
          : "#FFFFFF",
    };
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={outline ? Colors[theme][variant] : "#FFFFFF"}
        />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  fullWidth: {
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

import Colors from "@/constants/Colors";
import { ColorName } from "@/types/theme/colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Text } from "../Themed";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ColorName;
  theme?: "light" | "dark";
  loading?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
  textStyle?: TextStyle; // 👈 nuevo prop
}

export default function Button({
  title,
  variant = "purple",
  theme = "light",
  loading = false,
  fullWidth = false,
  outline = false,
  disabled,
  textStyle, // 👈 destructuramos
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

    return {
      color: Colors[theme].text,
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
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
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

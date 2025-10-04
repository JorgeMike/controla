// components/LoadingIndicator.tsx
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type LoadingIndicatorProps = {
  size?: "small" | "large";
  color?: string;
  message?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
};

export function LoadingIndicator({
  size = "large",
  color = "#007AFF",
  message,
  fullScreen = false,
  style,
}: LoadingIndicatorProps) {
  const containerStyle = fullScreen
    ? styles.fullScreenContainer
    : styles.container;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

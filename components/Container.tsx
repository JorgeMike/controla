import Measures from "@/constants/Measures";
import { StyleSheet, View, ViewProps } from "react-native";

/**
 * Container component that applies default padding.
 * @param param0
 * @returns
 */
export default function Container({ style, ...props }: ViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Measures.small,
    paddingHorizontal: Measures.large,
  },
});

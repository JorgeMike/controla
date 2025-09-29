import Measures from "@/constants/Measures";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Container({ style, ...props }: ViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Measures.medium,
    paddingHorizontal: Measures.large,
  },
});

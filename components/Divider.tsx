import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function Divider() {
  return (
    <View
      style={styles.divider}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    height: 1,
  },
});

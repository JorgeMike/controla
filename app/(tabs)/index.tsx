import { StyleSheet, useColorScheme } from "react-native";

import ActionButtons from "@/components/ActionButtons";
import Container from "@/components/Container";
import Greetings from "@/components/Greetings";
import Header from "@/components/Header";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? "light";

  return (
    <LinearGradient
      colors={[Colors[theme].primary, "transparent"]}
      end={{ x: 1, y: 1 }}
      start={{ x: 1, y: 0 }}
      style={{
        paddingTop: insets.top,
        flex: 1,
      }}
    >
      <Container>
        <Header theme={theme} />
        <Greetings />
        <SummaryTitle theme={theme} title="Total" amount="$15,130.15" />
      </Container>

      <ActionButtons />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

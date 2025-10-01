import Container from "@/components/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        {/* Apariencia */}
        <View>
          <ThemeToggle />
        </View>
      </Container>
    </ScrollView>
  );
}

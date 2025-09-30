import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

export interface SummaryItem {
  title: string;
  amount: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
}

interface SummaryCarouselProps {
  theme: "light" | "dark";
  data: SummaryItem[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SummaryCarousel: React.FC<SummaryCarouselProps> = ({ theme, data }) => {
  const progress = useSharedValue<number>(0);

  return (
    <View style={styles.container}>
      <Carousel
        autoPlay
        autoPlayInterval={5000}
        width={SCREEN_WIDTH}
        height={90}
        data={data}
        scrollAnimationDuration={500}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <SummaryTitle
              theme={theme}
              title={item.title}
              amount={item.amount}
              amountType="h2"
              iconName={item.iconName}
              iconColor={item.iconColor || Colors[theme].secondary}
            />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          backgroundColor: Colors[theme].text + "40",
          borderRadius: 50,
        }}
        activeDotStyle={{
          backgroundColor: Colors[theme].text,
        }}
        containerStyle={{ gap: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default SummaryCarousel;

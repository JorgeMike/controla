import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

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
  const [currentIndex, setCurrentIndex] = useState(0);

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
        onSnapToItem={(index) => setCurrentIndex(index)}
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

      {/* Paginación custom sin warnings */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex
                    ? Colors[theme].text
                    : Colors[theme].text + "40",
              },
            ]}
          />
        ))}
      </View>
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
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});

export default SummaryCarousel;

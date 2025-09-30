import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CAROUSEL_DATA = [
  {
    id: "1",
    title: "¿Sientes que pierdes el control?",
    description:
      "Tu dinero se va sin darte cuenta y no sabes exactamente en qué lo gastas.",
    image: require("../../assets/images/onboarding/first.png"),
  },
  {
    id: "2",
    title: "Toma el control de tus finanzas",
    description:
      "Registra tus gastos, ingresos y reembolsos de forma simple y rápida.",
    image: require("../../assets/images/onboarding/second.png"),
  },
  {
    id: "3",
    title: "Comienza a ahorrar hoy",
    description:
      "Da el primer paso hacia una vida financiera más saludable y organizada.",
    image: require("../../assets/images/onboarding/third.png"),
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useAppTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleNext = () => {
    if (currentIndex < CAROUSEL_DATA.length - 1) {
      // Avanzar a la siguiente página
      carouselRef.current?.next();
    } else {
      // Última página - acción de "Comenzar"
      handleStart();
    }
  };

  const handleStart = () => {
    console.log("Comenzar - Navegar a la app principal");
    router.replace("/(onboarding)/onboarding-form");
  };

  const renderItem = ({ item }: { item: (typeof CAROUSEL_DATA)[0] }) => (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text type="h2" style={styles.title}>
          {item.title}
        </Text>
        <Text type="bodyM" style={styles.description}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Carousel
        ref={carouselRef}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT - insets.top - insets.bottom}
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        loop={false}
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress));
        }}
      />

      {/* Indicadores de página */}
      <View style={[styles.pagination, { bottom: insets.bottom + 100 }]}>
        {CAROUSEL_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Botón Siguiente/Comenzar */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            bottom: insets.bottom + 40,
            backgroundColor: Colors[theme].background + "DD",
          },
        ]}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text type="buttonL">
          {currentIndex === CAROUSEL_DATA.length - 1 ? "Comenzar" : "Siguiente"}
        </Text>
      </TouchableOpacity>

      {/* Botón "Saltar" (opcional) */}
      {currentIndex < CAROUSEL_DATA.length - 1 && (
        <TouchableOpacity
          style={[styles.skipButton, { top: insets.top + 20 }]}
          onPress={handleStart}
          activeOpacity={0.6}
        >
          <Text type="bodyS" style={styles.skipText}>
            Saltar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  image: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
    paddingHorizontal: 10,
  },
  pagination: {
    marginBottom: 20,
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 24,
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 30,
  },
  skipButton: {
    position: "absolute",
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    opacity: 0.7,
  },
});

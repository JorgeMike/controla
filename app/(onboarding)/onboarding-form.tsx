import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CURRENCY_OPTIONS } from "@/constants/Currency";
import Measures from "@/constants/Measures";
import { useAppTheme } from "@/contexts/ThemeContext";
import { userRepository } from "@/database/modules/Users/usersRepository";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Tipos de datos del formulario
interface FormData {
  name: string;
  email: string;
  currency: string;
  monthlyGoal: string;
}

// Pasos del formulario
const FORM_STEPS = [
  {
    id: "1",
    title: "Un toque personal",
    description: "¿Cómo te gustaría que te llamemos?",
    field: "name" as keyof FormData,
  },
  {
    id: "2",
    title: "Balance inicial",
    description: "¿Cuánto dinero tienes actualmente?",
    field: "initialBalance" as keyof FormData,
  },
  {
    id: "3",
    title: "Tu moneda",
    description: "Selecciona la moneda que usarás",
    field: "currency" as keyof FormData,
  },
  {
    id: "4",
    title: "Meta mensual",
    description: "¿Cuánto quieres ahorrar al mes? (Opcional)",
    field: "monthlyGoal" as keyof FormData,
  },
];

export default function OnboardingFormScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  // Estado del formulario
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    currency: "USD",
    monthlyGoal: "",
  });

  // Actualizar campo del formulario
  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validar paso actual
  const canProceed = () => {
    const currentStep = FORM_STEPS[currentIndex];
    const value = formData[currentStep.field];

    // El último paso (meta mensual) es opcional
    if (currentIndex === FORM_STEPS.length - 1) {
      return true;
    }

    // Los demás campos son requeridos
    return value.trim() !== "";
  };

  // Avanzar al siguiente paso
  const handleNext = () => {
    if (currentIndex < FORM_STEPS.length - 1 && canProceed()) {
      carouselRef.current?.next();
    } else if (currentIndex === FORM_STEPS.length - 1) {
      handleFinish();
    }
  };

  // Finalizar configuración
  const handleFinish = async () => {
    try {
      await userRepository.create({
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        currency: formData.currency,
        currency_symbol:
          CURRENCY_OPTIONS.find((c) => c.code === formData.currency)?.symbol ||
          "$",
        actual_account: true,
      });
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error al finalizar el onboarding:", error);
    }
  };

  // Retroceder al paso anterior
  const handleBack = () => {
    if (currentIndex > 0) {
      carouselRef.current?.prev();
    }
  };

  // Renderizar paso del formulario según el tipo
  const renderFormStep = (step: (typeof FORM_STEPS)[0]) => {
    switch (step.field) {
      case "name":
        return (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[theme].background,
                  color: Colors[theme].text,
                  borderColor: Colors[theme].text + "30",
                },
              ]}
              placeholder="Tu nombre"
              placeholderTextColor={Colors[theme].text + "60"}
              value={formData.name}
              onChangeText={(text) => updateFormField("name", text)}
              autoCapitalize="words"
              autoFocus
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[theme].background,
                  color: Colors[theme].text,
                  borderColor: Colors[theme].text + "30",
                },
              ]}
              placeholder="Email (opcional)"
              placeholderTextColor={Colors[theme].text + "60"}
              value={formData.email}
              onChangeText={(text) => updateFormField("email", text)}
              autoCapitalize="words"
            />
          </>
        );

      case "currency":
        return (
          <ScrollView
            style={styles.currencyContainer}
            showsVerticalScrollIndicator={false}
          >
            {CURRENCY_OPTIONS.map((currency) => (
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyOption,
                  {
                    backgroundColor: Colors[theme].background,
                    borderColor:
                      formData.currency === currency.code
                        ? Colors[theme].blue
                        : Colors[theme].text + "30",
                  },
                ]}
                onPress={() => updateFormField("currency", currency.code)}
                activeOpacity={0.7}
              >
                <View style={styles.currencyInfo}>
                  <Text type="h3" style={styles.currencySymbol}>
                    {currency.symbol}
                  </Text>
                  <View style={{ backgroundColor: "transparent" }}>
                    <Text type="bodyL">{currency.name}</Text>
                    <Text type="bodyS" style={styles.currencyCode}>
                      {currency.code}
                    </Text>
                  </View>
                </View>
                {formData.currency === currency.code && (
                  <View
                    style={[
                      styles.selectedIndicator,
                      { backgroundColor: Colors[theme].blue },
                    ]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      case "monthlyGoal":
        return (
          <View style={{ backgroundColor: "transparent" }}>
            <TextInput
              style={[
                styles.input,
                styles.inputNumber,
                {
                  backgroundColor: Colors[theme].background,
                  color: Colors[theme].text,
                  borderColor: Colors[theme].text + "30",
                },
              ]}
              placeholder="0.00"
              placeholderTextColor={Colors[theme].text + "60"}
              value={formData.monthlyGoal}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9.]/g, "");
                updateFormField("monthlyGoal", cleaned);
              }}
              keyboardType="decimal-pad"
            />
            <Text type="bodyS" style={styles.optionalText}>
              Puedes omitir este paso si lo prefieres
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const renderItem = ({ item }: { item: (typeof FORM_STEPS)[0] }) => (
    <KeyboardAvoidingView
      style={styles.slideContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <View style={{ marginBottom: 20 }}>
          <Text type="h2" style={styles.title}>
            {item.title}
          </Text>
          <Text type="bodyM" style={styles.description}>
            {item.description}
          </Text>
        </View>

        <View style={styles.formContainer}>{renderFormStep(item)}</View>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Indicador de progreso */}
      <View style={[styles.progressContainer, { top: insets.top + 20 }]}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentIndex + 1) / FORM_STEPS.length) * 100}%`,
                backgroundColor: Colors[theme].text,
              },
            ]}
          />
        </View>
        <Text type="bodyS" style={styles.progressText}>
          {currentIndex + 1} de {FORM_STEPS.length}
        </Text>
      </View>

      {/* Carrusel de formulario */}
      <Carousel
        ref={carouselRef}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT - insets.top - insets.bottom - 160}
        data={FORM_STEPS}
        renderItem={renderItem}
        loop={false}
        enabled={false} // Deshabilitar swipe manual
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress));
        }}
      />

      {/* Botones de navegación */}

      <View style={[styles.buttonContainer, { bottom: insets.bottom + 20 }]}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonSecondary,
              { borderColor: Colors[theme].text + "30" },
            ]}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text type="buttonM">Atrás</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonPrimary,
            {
              borderColor: Colors[theme].text + "30",
            },
          ]}
          onPress={handleNext}
          disabled={!canProceed() && currentIndex < FORM_STEPS.length - 1}
          activeOpacity={0.8}
        >
          <Text type="buttonM" style={{ color: "#fff" }}>
            {currentIndex === FORM_STEPS.length - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        type="bodyXS"
        style={{
          textAlign: "center",
          color: Colors[theme].text + "60",
          paddingHorizontal: Measures.large,
          paddingTop: Measures.xxlarge,
        }}
      >
        Todos tus datos son manejados localmente y nunca se comparten ni
        almacenan en servidores externos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "transparent",
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    textAlign: "center",
    opacity: 0.7,
  },
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
    gap: 40,
    backgroundColor: "transparent",
  },
  headerContainer: {
    gap: 12,
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    lineHeight: 40,
  },
  description: {
    textAlign: "center",
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  formContainer: {
    gap: 16,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    textAlign: "center",
  },
  inputNumber: {
    fontSize: 32,
    fontWeight: "600",
  },
  currencyContainer: {
    maxHeight: 400,
  },
  currencyOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 10,
  },
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "transparent",
  },
  currencySymbol: {
    fontSize: 28,
    width: 40,
    textAlign: "center",
  },
  currencyCode: {
    opacity: 0.6,
    marginTop: 2,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  optionalText: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: 8,
  },
  buttonContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    flex: 1,
    borderWidth: 2,
  },
  buttonSecondary: {
    borderWidth: 2,
    paddingHorizontal: 24,
  },
});

import { Text, View } from "@/components/Themed";
import ImageViewer from "@/components/ui/ImageViewer";
import SelectableList, { SelectableItem } from "@/components/ui/SelectableList";
import Colors from "@/constants/Colors";
import { CURRENCY_OPTIONS } from "@/constants/Currency";
import Measures from "@/constants/Measures";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { UserService } from "@/database/modules/Users/usersService";
import { NewUser } from "@/database/types";
import { saveImageToAppDirectory } from "@/utils/images-utils";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
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

const PlaceholderImage = require("@/assets/avatars/avatar.png");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const userService = new UserService();

// Tipos de datos del formulario
interface FormData extends Omit<NewUser, "actual_account"> {}

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
    title: "Foto de perfil",
    description: "Añade una foto para personalizar tu cuenta",
    field: "profile_image" as keyof FormData,
  },
  {
    id: "3",
    title: "Tu moneda",
    description: "Selecciona la moneda que usarás",
    field: "currency" as keyof FormData,
  },
];

const currencyItems: SelectableItem[] = CURRENCY_OPTIONS.map((currency) => ({
  id: currency.code,
  label: currency.name,
  subtitle: currency.code,
  icon: (
    <Text type="h3" style={{ fontSize: 28 }}>
      {currency.symbol}
    </Text>
  ),
}));

export default function OnboardingFormScreen() {
  const insets = useSafeAreaInsets();

  const { setUser } = useUser();
  const { theme } = useAppTheme();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const carouselRef = useRef<ICarouselInstance>(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      try {
        // Guardar permanentemente
        const permanentUri = await saveImageToAppDirectory(
          result.assets[0].uri
        );
        updateFormField("profile_image", permanentUri);
      } catch (error) {
        alert("Error al guardar la imagen. Intenta de nuevo.");
      }
    } else {
      alert("You did not select any image.");
    }
  };

  // Estado del formulario
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    currency: "USD",
    actual_account: true,
    profile_image: "",
    currency_symbol: "",
  });

  // Actualizar campo del formulario
  const updateFormField = (field: keyof NewUser, value: string) => {
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
    return value && value.trim() !== "";
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
    if (isLoading) return;

    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }

    setIsLoading(true);

    try {
      const newUser = await userService.create({
        name: formData.name.trim(),
        email: formData.email && formData.email.trim(),
        currency: formData.currency,
        currency_symbol:
          CURRENCY_OPTIONS.find((c) => c.code === formData.currency)?.symbol ||
          "$",
        actual_account: true,
        profile_image: formData.profile_image || undefined,
      });

      console.log("✅ Usuario creado:", newUser);

      setUser(newUser);

      // La navegación se hará automáticamente por el useEffect en RootLayoutNav
    } catch (error) {
      console.error("Error al finalizar el onboarding:", error);
      Alert.alert("Error", "No se pudo crear el usuario. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
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

      case "profile_image": {
        return (
          <>
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={pickImageAsync}
              >
                <ImageViewer
                  style={{ width: 180, height: 180, borderRadius: 90 }}
                  imgSource={PlaceholderImage}
                  selectedImage={selectedImage}
                />
              </TouchableOpacity>
            </View>
          </>
        );
      }

      case "currency":
        return (
          <ScrollView
            style={styles.currencyContainer}
            showsVerticalScrollIndicator={false}
          >
            <SelectableList
              items={currencyItems}
              selectedId={formData.currency}
              onSelect={(id) => updateFormField("currency", id)}
            />
          </ScrollView>
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
            disabled={isLoading}
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
          disabled={
            (!canProceed() && currentIndex < FORM_STEPS.length - 1) || isLoading
          }
          activeOpacity={0.8}
        >
          <Text type="buttonM">
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
  imagePickerContainer: {
    alignItems: "center",
    gap: 20,
    backgroundColor: "transparent",
  },
  imagePickerButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

import Container from "@/components/Container";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import ColorPicker, { ColorOption } from "@/components/ui/ColorPicker";
import IconPicker from "@/components/ui/IconPicker";
import Input from "@/components/ui/Input";
import ModalSelect from "@/components/ui/ModalSelect";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { NewBankAccount } from "@/database/modules/BankAccounts/bankAccountsTypes";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Modal, PaperProvider, Portal } from "react-native-paper";

const SEMANTIC_COLORS: ColorOption[] = [
  { name: "purple", light: "#9C27B0", dark: "#9C27B0" },
  { name: "blue", light: "#4A90E2", dark: "#5BA3F5" },
  { name: "green", light: "#4CAF50", dark: "#66BB6A" },
  { name: "orange", light: "#FF9800", dark: "#FFB74D" },
  { name: "red", light: "#F44336", dark: "#EF5350" },
  { name: "yellow", light: "#FFEB3B", dark: "#FFF176" },
  { name: "gray", light: "#9E9E9E", dark: "#808080" },
];

const bankIcons: React.ComponentProps<typeof Ionicons>["name"][] = [
  "card",
  "card-outline",
  "wallet",
  "wallet-outline",
  "cash",
  "cash-outline",
  "business",
  "business-outline",
  "home",
  "home-outline",
  "briefcase",
  "briefcase-outline",
  "bar-chart",
  "bar-chart-outline",
];

const CURRENCY_OPTIONS = [
  { label: "USD - Dólar", value: "USD", symbol: "$" },
  { label: "EUR - Euro", value: "EUR", symbol: "€" },
  { label: "MXN - Peso Mexicano", value: "MXN", symbol: "$" },
  { label: "COP - Peso Colombiano", value: "COP", symbol: "$" },
  { label: "ARS - Peso Argentino", value: "ARS", symbol: "$" },
  { label: "CLP - Peso Chileno", value: "CLP", symbol: "$" },
];

export default function AddAccountScreen() {
  const { theme } = useAppTheme() ?? "light";
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<NewBankAccount>({
    currency: "USD",
    currency_symbol: "$",
    initial_balance: 0,
    current_balance: 0,
    is_active: true,
    name: "",
    user_id: 1, // TODO: obtener del contexto de usuario
  });
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedIcon, setSelectedIcon] =
    useState<React.ComponentProps<typeof Ionicons>["name"]>("wallet");

  const handleNameChange = (text: string) => {
    setFormData((prev) => ({ ...prev, name: text }));
  };

  const handleBalanceChange = (text: string) => {
    // Remover caracteres no numéricos excepto punto decimal
    const cleanText = text.replace(/[^0-9.]/g, "");
    const balance = parseFloat(cleanText) || 0;

    setFormData((prev) => ({
      ...prev,
      initial_balance: balance,
      current_balance: balance,
    }));
  };

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = CURRENCY_OPTIONS.find(
      (opt) => opt.value === value
    );

    setFormData((prev) => ({
      ...prev,
      currency: value,
      currency_symbol: selectedCurrency?.symbol || "$",
    }));
  };

  const handleSubmit = () => {
    // Validaciones
    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingresa un nombre para la cuenta");
      return;
    }

    if (formData.initial_balance < 0) {
      Alert.alert("Error", "El saldo inicial no puede ser negativo");
      return;
    }

    // Mostrar modal con resumen
    setShowModal(true);
  };

  const handleConfirm = () => {
    const completeData = {
      ...formData,
      color: selectedColor,
      icon: selectedIcon,
    };

    console.log(
      "📊 Datos del formulario:",
      JSON.stringify(completeData, null, 2)
    );

    // Aquí iría la lógica para guardar en la BD
    setShowModal(false);
    Alert.alert("Éxito", "Cuenta agregada correctamente");
  };

  const getColorHex = () => {
    const color = SEMANTIC_COLORS.find((c) => c.name === selectedColor);
    return theme === "light" ? color?.light : color?.dark;
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Input
              label="Nombre de la cuenta"
              iconName="wallet"
              placeholder="Ej: BBVA, Santander, Meli"
              value={formData.name}
              onChangeText={handleNameChange}
            />
            <Input
              label="Saldo inicial"
              iconName="cash"
              placeholder="Ej: 1000 o 1000.50"
              keyboardType="numeric"
              value={
                formData.initial_balance > 0
                  ? formData.initial_balance.toString()
                  : ""
              }
              onChangeText={handleBalanceChange}
            />
            <ModalSelect
              iconName="cash"
              label="Moneda de la cuenta"
              placeholder="Selecciona una moneda"
              onValueChange={handleCurrencyChange}
              selectedValue={formData.currency}
              theme={theme}
              options={CURRENCY_OPTIONS}
            />

            <ColorPicker
              colors={SEMANTIC_COLORS}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              label="Color"
              theme={theme}
            />

            <IconPicker
              icons={bankIcons}
              selectedIcon={selectedIcon}
              onIconChange={setSelectedIcon}
              label="Selecciona un ícono"
              theme={theme}
            />

            <Button
              title="Agregar cuenta"
              variant="blue"
              theme={theme}
              onPress={handleSubmit}
              fullWidth
            />
          </Container>
        </ScrollView>

        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={[
              styles.modalContainer,
              { backgroundColor: Colors[theme].surface },
            ]}
          >
            <Text style={[styles.modalTitle]}>Resumen de la cuenta</Text>

            <View
              style={[
                styles.accountPreview,
                {
                  backgroundColor: getColorHex(),
                  borderColor: Colors[theme].surfaceVariant,
                },
              ]}
            >
              <Ionicons
                name={selectedIcon}
                size={48}
                color={Colors[theme].background}
              />
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel]}>Nombre:</Text>
                <Text style={[styles.summaryValue]}>{formData.name}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel]}>Saldo inicial:</Text>
                <Text style={[styles.summaryValue]}>
                  {formData.currency_symbol}{" "}
                  {formData.initial_balance.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel]}>Moneda:</Text>
                <Text style={[styles.summaryValue]}>{formData.currency}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel]}>Color:</Text>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: getColorHex() },
                  ]}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                variant="gray"
                theme={theme}
                onPress={() => setShowModal(false)}
                style={{ flex: 1 }}
              />
              <Button
                title="Confirmar"
                variant="blue"
                theme={theme}
                onPress={handleConfirm}
                style={{ flex: 1 }}
              />
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  accountPreview: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
    borderWidth: 2,
  },
  summaryContainer: {
    gap: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  colorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
});

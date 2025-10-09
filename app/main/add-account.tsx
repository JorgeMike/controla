import Container from "@/components/Container";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import ColorPicker from "@/components/ui/ColorPicker";
import IconPicker from "@/components/ui/IconPicker";
import Input from "@/components/ui/Input";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import ModalSelect from "@/components/ui/ModalSelect";
import SummaryTitle from "@/components/ui/SummaryTitle";
import Colors, { SEMANTIC_COLORS } from "@/constants/Colors";
import {
  CURRENCY_OPTIONS_INDEXED,
  CURRENCY_OPTIONS_LABELS,
} from "@/constants/Currency";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { BankAccountService } from "@/database/modules/BankAccounts/bankAccountService";
import { NewBankAccount } from "@/database/modules/BankAccounts/bankAccountsTypes";
import { ColorName } from "@/types/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Modal, PaperProvider, Portal } from "react-native-paper";

const bankIcons: React.ComponentProps<typeof Ionicons>["name"][] = [
  "card",
  "card-outline",
  "wallet",
  "wallet-outline",
  "cash",
  "cash-outline",
  "briefcase",
  "briefcase-outline",
  "bar-chart",
  "bar-chart-outline",
];

const bankAccountService = new BankAccountService();

export default function AddAccountScreen() {
  const { theme } = useAppTheme() ?? "light";
  const { createAccount } = useBankAccounts();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [balanceInput, setBalanceInput] = useState<string>("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [successCreation, setSuccessCreation] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<NewBankAccount>({
    currency: "USD",
    currency_symbol: "$",
    initial_balance: 0,
    current_balance: 0,
    is_active: 1,
    name: "",
    user_id: 1, // TODO: obtener del contexto de usuario
  });
  const [selectedColor, setSelectedColor] = useState<ColorName>("purple");
  const [selectedIcon, setSelectedIcon] =
    useState<React.ComponentProps<typeof Ionicons>["name"]>("wallet");

  const handleNameChange = (text: string) => {
    setFormData((prev) => ({ ...prev, name: text }));
  };

  const handleBalanceChange = (text: string) => {
    // Limpiar el input
    let cleaned = text.replace(/[^0-9.]/g, "");

    // Prevenir múltiples puntos
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    // Guardar el string en el estado del input
    setBalanceInput(cleaned);

    // Actualizar el número solo si es válido
    const numValue = parseFloat(cleaned) || 0;
    setFormData((prev) => ({
      ...prev,
      initial_balance: numValue,
      current_balance: numValue,
    }));
  };

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = CURRENCY_OPTIONS_INDEXED[value];

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

  const handleConfirm = async () => {
    if (!user) {
      setError("User not found. Please log in again.");
      return;
    }

    const completeData: NewBankAccount = {
      ...formData,
      color: selectedColor,
      icon: selectedIcon,
      user_id: user?.id || 1,
    };
    setCreatingAccount(true);

    try {
      await createAccount(completeData);

      setCreatingAccount(false);
      setSuccessCreation(true);
    } catch (error) {
      setError("Error creating account: " + (error as Error).message);
      setSuccessCreation(false);
    } finally {
      setCreatingAccount(false);
    }
  };

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[theme].background,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {error && (
            <Text
              style={{
                backgroundColor: Colors[theme].error + "20",
                color: Colors[theme].error,
                textAlign: "center",
                marginTop: 16,
              }}
            >
              {error}
            </Text>
          )}
          <Container>
            <Input
              label="Nombre de la cuenta"
              iconName="wallet"
              placeholder="Ej: BBVA, Santander, Meli"
              value={formData.name}
              onChangeText={handleNameChange}
              theme={theme}
            />
            <Input
              label="Saldo inicial"
              iconName="cash"
              placeholder="Ej: 1000 o 1000.50"
              theme={theme}
              keyboardType="decimal-pad"
              value={balanceInput}
              onChangeText={handleBalanceChange}
            />
            <ModalSelect
              iconName="cash"
              label="Moneda de la cuenta"
              placeholder="Selecciona una moneda"
              onValueChange={handleCurrencyChange}
              selectedValue={formData.currency}
              theme={theme}
              options={CURRENCY_OPTIONS_LABELS}
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
              style={{ marginBottom: 32 }}
              title="Agregar cuenta"
              variant="blue"
              theme={theme}
              onPress={handleSubmit}
              fullWidth
              textStyle={{
                color: "#ffffff",
              }}
            />
          </Container>
        </ScrollView>

        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => {
              setShowModal(false);
              setSuccessCreation(null);
            }}
            contentContainerStyle={[
              styles.modalContainer,
              {
                backgroundColor: Colors[theme].surface,
                borderWidth: 2,
                borderColor: Colors[theme].border,
              },
            ]}
            theme={{
              colors: {
                backdrop: Colors[theme].background + "99",
              },
            }}
          >
            {creatingAccount ? (
              <LoadingIndicator />
            ) : successCreation ? (
              // Vista de éxito
              <View>
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                  <Ionicons
                    name="checkmark-circle"
                    size={64}
                    color={Colors[theme].blue}
                  />
                </View>

                <Text
                  type="h1"
                  style={{ textAlign: "center", marginBottom: 8 }}
                >
                  ¡Cuenta creada!
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 24 }}>
                  Tu cuenta "{formData.name}" se ha creado exitosamente
                </Text>

                <View style={styles.modalButtons}>
                  <Button
                    title="Crear otra"
                    variant="gray"
                    theme={theme}
                    onPress={() => {
                      setShowModal(false);
                      setSuccessCreation(null);
                      setFormData({
                        currency: "USD",
                        currency_symbol: "$",
                        initial_balance: 0,
                        current_balance: 0,
                        is_active: 1,
                        name: "",
                        user_id: 1,
                      });
                      setBalanceInput("");
                      setSelectedColor("purple");
                      setSelectedIcon("wallet");
                    }}
                    style={{ flex: 1 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Button
                    title="Mis cuentas"
                    variant="blue"
                    theme={theme}
                    onPress={() => {
                      setShowModal(false);
                      router.push("/main/(tabs)/accounts");
                    }}
                    style={{ flex: 1 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </View>
              </View>
            ) : (
              // Vista de resumen original
              <React.Fragment>
                <Text style={styles.modalTitle}>Asi se verá tu cuenta</Text>

                <SummaryTitle
                  amount={`${
                    formData.currency_symbol
                  } ${formData.initial_balance.toFixed(2)}`}
                  theme={theme}
                  title={formData.name || "Nombre de la cuenta"}
                  iconName={selectedIcon}
                  iconColor={Colors[theme][selectedColor]}
                  style={{
                    marginBottom: 24,
                    borderColor: Colors[theme].border,
                    borderWidth: 1,
                  }}
                />

                <View style={styles.modalButtons}>
                  <Button
                    title="Cancelar"
                    variant="gray"
                    theme={theme}
                    onPress={() => setShowModal(false)}
                    style={{ flex: 1 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Button
                    title="Confirmar"
                    variant="blue"
                    theme={theme}
                    onPress={handleConfirm}
                    style={{ flex: 1 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </View>
              </React.Fragment>
            )}
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
    marginBottom: 12,
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

import Container from "@/components/Container";
import { View } from "@/components/Themed";
import DatePicker from "@/components/ui/DatePicker";
import Input from "@/components/ui/Input";
import ModalSelect from "@/components/ui/ModalSelect";
import { CATEGORIES, CATEGORIES_INDEXED } from "@/constants/Categories";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { NewTransaction } from "@/database/modules/Transactions/transactionsTypes";
import React, { useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export default function AddExpenseScreen() {
  // hooks
  const { theme } = useAppTheme();
  const { accounts } = useBankAccounts();

  //estados del sistema
  const [error, setError] = useState<string | null>(null);

  // estados auxiliares del formulario
  const [amountInput, setAmountInput] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // estado principal del formulario
  const [formData, setFormData] = useState<NewTransaction>({
    user_id: 1,
    bank_account_id: 1,
    type: "expense",
    amount: 0,
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
  });

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        label: `${account.name} (${account.currency})`,
        value: account.id.toString(),
        icon: account.icon || "wallet",
      })),
    [accounts]
  );

  const handleAmountChange = (text: string) => {
    // Limpiar el input
    let cleaned = text.replace(/[^0-9.]/g, "");

    // Prevenir múltiples puntos
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    // Guardar el string en el estado del input
    setAmountInput(cleaned);

    // Actualizar el número solo si es válido
    const numValue = parseFloat(cleaned) || 0;
    setFormData((prev) => ({
      ...prev,
      amount: numValue,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[theme].background,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              <ModalSelect
                iconName="wallet"
                label="Seleccionar cuenta"
                placeholder="Selecciona la cuenta del movimiento"
                theme={theme}
                selectedValue={formData.bank_account_id.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    bank_account_id: parseInt(value),
                  }))
                }
                options={accountOptions}
              />
              <Input
                label="Monto gastado"
                iconName="cash"
                placeholder="Ej: 1000 o 1000.99"
                theme={theme}
                keyboardType="decimal-pad"
                value={amountInput}
                onChangeText={handleAmountChange}
              />
              <ModalSelect
                iconName={
                  formData.category
                    ? CATEGORIES_INDEXED[formData.category].icon
                    : "wallet"
                }
                label="Selecciona la categoría"
                placeholder="Selecciona la categoría del gasto"
                theme={theme}
                selectedValue={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
                options={CATEGORIES}
              />
              <DatePicker
                iconName="calendar"
                label="Fecha del gasto"
                placeholder="Selecciona la fecha"
                theme={theme}
                value={selectedDate}
                onChange={(date) => {
                  if (date) setSelectedDate(date);
                }}
              />
              <DatePicker
                iconName="time"
                label="Hora del gasto (opcional)"
                placeholder="--:-- --"
                mode="time"
                theme={theme}
                optional={true}
                value={selectedTime}
                onChange={(time) => {
                  setSelectedTime(time);
                  // Solo actualizar si hay tiempo seleccionado
                  if (time) {
                    const combined = new Date(selectedDate);
                    combined.setHours(time.getHours());
                    combined.setMinutes(time.getMinutes());
                    // Guardar donde necesites
                  }
                }}
              />
              <Input
                label="Nota sobre el gasto"
                iconName="pencil"
                placeholder="Agrega una nota (opcional)"
                theme={theme}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
              />
            </Container>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/* import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import Container from "@/components/Container";
import { Text, View } from "@/components/Themed";
import DatePicker from "@/components/ui/DatePicker";
import Input from "@/components/ui/Input";
import ModalSelect from "@/components/ui/ModalSelect";
import { CATEGORIES, CATEGORIES_INDEXED } from "@/constants/Categories";
import Colors from "@/constants/Colors";
import { useBankAccounts } from "@/contexts/BankAccountsContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { NewTransaction } from "@/database/modules/Transactions/transactionsTypes";
import { useMemo, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AddExpenseScreen() {
  const { theme } = useAppTheme();
  const { accounts } = useBankAccounts();
  const [error, setError] = useState<string | null>(null);
  const [amountInput, setAmountInput] = useState<string>("");

  const [formData, setFormData] = useState<NewTransaction>({
    user_id: 1,
    bank_account_id: 1,
    type: "expense",
    amount: 0,
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
  });

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        label: `${account.name} (${account.currency})`,
        value: account.id.toString(),
      })),
    [accounts]
  );

  const handleAmountChange = (text: string) => {
    // Limpiar el input
    let cleaned = text.replace(/[^0-9.]/g, "");

    // Prevenir múltiples puntos
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    // Guardar el string en el estado del input
    setAmountInput(cleaned);

    // Actualizar el número solo si es válido
    const numValue = parseFloat(cleaned) || 0;
    setFormData((prev) => ({
      ...prev,
      amount: numValue,
    }));
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.slideContainer}
    >
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
            <ModalSelect
              iconName="wallet"
              label="Seleccionar cuenta"
              placeholder="Selecciona la cuenta del movimiento"
              theme={theme}
              selectedValue={formData.bank_account_id.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  bank_account_id: parseInt(value),
                }))
              }
              options={accountOptions}
            />
            <Input
              label="Monto gastado"
              iconName="cash"
              placeholder="Ej: 1000 o 1000.99"
              theme={theme}
              keyboardType="decimal-pad"
              value={amountInput}
              onChangeText={handleAmountChange}
            />
            <ModalSelect
              iconName={
                formData.category
                  ? CATEGORIES_INDEXED[formData.category].icon
                  : "wallet"
              }
              label="Selecciona la categoría"
              placeholder="Selecciona la categoría del gasto"
              theme={theme}
              selectedValue={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value,
                }))
              }
              options={CATEGORIES}
            />
            <DatePicker
              iconName="calendar"
              label="Fecha del gasto"
              placeholder="Selecciona la fecha"
              theme={theme}
              value={selectedDate}
              onChange={(date) => {
                if (date) setSelectedDate(date);
              }}
            />

            <DatePicker
              iconName="time"
              label="Hora del gasto (opcional)"
              placeholder="--:-- --"
              mode="time"
              theme={theme}
              optional={true}
              value={selectedTime}
              onChange={(time) => {
                setSelectedTime(time);
                // Solo actualizar si hay tiempo seleccionado
                if (time) {
                  const combined = new Date(selectedDate);
                  combined.setHours(time.getHours());
                  combined.setMinutes(time.getMinutes());
                  // Guardar donde necesites
                }
              }}
            />
            <Input
              label="Nota sobre el gasto"
              iconName="pencil"
              placeholder="Agrega una nota (opcional)"
              theme={theme}
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
            />
          </Container>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});
 */

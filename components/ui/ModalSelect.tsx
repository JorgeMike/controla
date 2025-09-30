import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../Themed";

// Tipo genérico con restricción para valores primitivos
export interface ModalSelectOption<T extends string | number = string> {
  label: string;
  value: T;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}

interface ModalSelectProps<T extends string | number = string> {
  theme: "light" | "dark"; // Añadido para manejar el tema
  options: ModalSelectOption<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  label?: string;
}

export default function ModalSelect<T extends string | number = string>({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Seleccionar...",
  theme = "light", // Valor por defecto
  label,
}: ModalSelectProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <>
      <Text type="labelXL" style={{ marginStart: 6, marginBottom: 6 }}>
        {label}
      </Text>
      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor: Colors[theme].surface,
            borderColor: Colors[theme].surfaceVariant,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectTextContainer}>
          {selectedOption?.icon && (
            <Ionicons
              name={selectedOption.icon}
              size={20}
              color="#666"
              style={styles.iconMargin}
            />
          )}
          <Text style={[styles.selectText]}>
            {selectedOption?.label || placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={[
            styles.modalOverlay,
            { backgroundColor: Colors[theme].surface + "60" },
          ]}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent]}>
            <View
              style={[
                styles.modalHeader,
                { borderColor: Colors[theme].background },
              ]}
            >
              <Text style={[styles.modalTitle]}>Seleccionar opción</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors[theme].text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === selectedValue && {
                      backgroundColor: Colors[theme].background,
                    },
                    { borderColor: Colors[theme].background },
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  {item.icon && (
                    <Ionicons
                      name={item.icon}
                      size={24}
                      color={
                        item.value === selectedValue
                          ? Colors[theme].secondary
                          : Colors[theme].text
                      }
                      style={styles.optionIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && {
                        color: Colors[theme].secondary,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={Colors[theme].secondary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconMargin: {
    marginRight: 8,
  },
  selectText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "600",
  },
});

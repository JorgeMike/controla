import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Tipo genérico con restricción para valores primitivos
export interface ModalSelectOption<T extends string | number = string> {
  label: string;
  value: T;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}

interface ModalSelectProps<T extends string | number = string> {
  theme: "light" | "dark";
  options: ModalSelectOption<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
}

export default function ModalSelect<T extends string | number = string>({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Seleccionar...",
  theme = "light",
  label,
  iconName,
}: ModalSelectProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color="#666"
            style={styles.icon}
          />
        )}
        <Text style={[styles.input, iconName && styles.inputWithIcon]}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color="#666"
          style={styles.chevron}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar opción</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.optionSelected,
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
                      color={item.value === selectedValue ? "#007AFF" : "#333"}
                      style={styles.optionIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <Ionicons name="checkmark" size={24} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  icon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  chevron: {
    marginRight: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
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
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionSelected: {
    backgroundColor: "#f0f0f0",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../Themed";

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
  const hasValue = selectedOption !== undefined;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: Colors[theme].text }]}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: Colors[theme].inputBackground,
            borderColor: modalVisible
              ? Colors[theme].inputBorderFocused
              : Colors[theme].inputBorder,
          },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={
              modalVisible
                ? Colors[theme].inputBorderFocused
                : Colors[theme].placeholder
            }
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.input,
            iconName && styles.inputWithIcon,
            {
              color: hasValue
                ? Colors[theme].inputText
                : Colors[theme].placeholder,
            },
          ]}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={
            modalVisible
              ? Colors[theme].inputBorderFocused
              : Colors[theme].placeholder
          }
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
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: Colors[theme].surface },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  backgroundColor: Colors[theme].surface,
                  borderBottomColor: Colors[theme].divider,
                },
              ]}
            >
              <Text style={[styles.modalTitle, { color: Colors[theme].text }]}>
                Seleccionar opción
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors[theme].text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => {
                const isSelected = item.value === selectedValue;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      {
                        borderBottomColor: Colors[theme].divider,
                        backgroundColor: isSelected
                          ? Colors[theme].surfaceVariant
                          : "transparent",
                      },
                    ]}
                    onPress={() => {
                      onValueChange(item.value);
                      setModalVisible(false);
                    }}
                    activeOpacity={0.7}
                  >
                    {item.icon && (
                      <View
                        style={[
                          styles.optionIconContainer,
                          isSelected && {
                            backgroundColor: Colors[theme].blue + "40",
                          },
                        ]}
                      >
                        <Ionicons
                          name={item.icon}
                          size={24}
                          color={
                            isSelected ? Colors[theme].blue : Colors[theme].text
                          }
                        />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: isSelected
                            ? Colors[theme].blue
                            : Colors[theme].text,
                          fontWeight: isSelected ? "600" : "400",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <View
                        style={[
                          styles.checkmark,
                          { backgroundColor: Colors[theme].blue },
                        ]}
                      >
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
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
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  icon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
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
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
    gap: 12,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

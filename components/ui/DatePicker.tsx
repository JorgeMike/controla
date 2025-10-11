import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "../Themed";

interface DatePickerProps {
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: Date | null; // Permitir null
  onChange: (date: Date | null) => void; // Permitir null
  placeholder?: string;
  theme?: "light" | "dark";
  mode?: "date" | "time" | "datetime";
  optional?: boolean; // Nueva prop
}

export default function DatePicker({
  iconName = "calendar",
  label,
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  theme = "light",
  mode = "date",
  optional = false,
}: DatePickerProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      onChange(selectedDate);
      setIsFocused(false);
    }
  };

  const formatDate = (date: Date) => {
    if (mode === "date") {
      return date.toLocaleDateString();
    } else if (mode === "time") {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return date.toLocaleString();
  };

  const handlePress = () => {
    setShow(true);
    setIsFocused(true);
  };

  const handleClear = () => {
    if (optional) {
      onChange(null);
    }
  };

  const displayValue = value
    ? formatDate(value)
    : mode === "time"
    ? "--:-- --"
    : placeholder;

  return (
    <View style={styles.container}>
      <Text type="label" style={{ color: Colors[theme].text }}>
        {label}
      </Text>
      <View style={styles.row}>
        <Pressable
          onPress={handlePress}
          style={[
            styles.inputContainer,
            optional && styles.inputWithClear,
            {
              backgroundColor: Colors[theme].inputBackground,
              borderColor: isFocused
                ? Colors[theme].inputBorderFocused
                : Colors[theme].inputBorder,
            },
          ]}
        >
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={
                isFocused
                  ? Colors[theme].inputBorderFocused
                  : Colors[theme].placeholder
              }
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              iconName && styles.textWithIcon,
              {
                color: value
                  ? Colors[theme].inputText
                  : Colors[theme].placeholder,
              },
            ]}
          >
            {displayValue}
          </Text>
        </Pressable>

        {optional && value && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={24}
              color={Colors[theme].placeholder}
            />
          </Pressable>
        )}
      </View>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          is24Hour={false}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputWithClear: {
    flex: 1,
  },
  icon: {
    marginLeft: 12,
  },
  text: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  textWithIcon: {
    paddingLeft: 8,
  },
  clearButton: {
    padding: 4,
  },
});

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "../Themed";

interface InputProps {
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
  autoCapitalize?: React.ComponentProps<typeof TextInput>["autoCapitalize"];
  theme?: "light" | "dark";
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export default function Input({
  iconName,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "none",
  theme = "light",
  style,
  inputStyle,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Text type="label" style={{ color: Colors[theme].text }}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
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
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[
            styles.input,
            iconName && styles.inputWithIcon,
            { color: Colors[theme].inputText },
            inputStyle,
          ]}
          placeholderTextColor={Colors[theme].placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
});

import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput } from "react-native-paper";

interface InputFloatingLabelProps {
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: object;
}

export default function InputFloatingLabel({
  iconName,
  label,
  value,
  placeholder,
  onChangeText,
  style,
}: InputFloatingLabelProps) {
  const { theme } = useAppTheme();

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      left={
        iconName ? (
          <TextInput.Icon
            icon={() => (
              <Ionicons name={iconName} size={20} color={Colors[theme].blue} />
            )}
          />
        ) : undefined
      }
      theme={{
        roundness: 8,
        colors: {
          onSurfaceVariant: Colors[theme].gray,
        },
      }}
      style={[style, { backgroundColor: Colors[theme].background }]}
      outlineStyle={{ borderWidth: 2 }}
      outlineColor={Colors[theme].surfaceVariant}
      activeOutlineColor={Colors[theme].blue}
      textColor={Colors[theme].text}
      placeholderTextColor={Colors[theme].placeholder}
      placeholder={placeholder}
    />
  );
}

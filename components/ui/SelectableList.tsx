import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export interface SelectableItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
  value?: any;
}

interface SelectableListProps {
  items: SelectableItem[];
  selectedId: string;
  onSelect: (id: string, item: SelectableItem) => void;
  showCheckmark?: boolean;
  itemStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

export default function SelectableList({
  items,
  selectedId,
  onSelect,
  showCheckmark = true,
  itemStyle,
  containerStyle,
}: SelectableListProps) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              {
                backgroundColor: isSelected
                  ? Colors[theme].surfaceVariant
                  : Colors[theme].surface,
                borderColor: isSelected
                  ? Colors[theme].inputBorderFocused
                  : Colors[theme].border,
              },
              itemStyle,
            ]}
            onPress={() => onSelect(item.id, item)}
            activeOpacity={0.7}
          >
            <View style={styles.itemContent}>
              {item.icon && (
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && {
                      backgroundColor: Colors[theme].inputBorderFocused + "40",
                      borderRadius: 8,
                    },
                  ]}
                >
                  {item.icon}
                </View>
              )}
              <View style={styles.textContainer}>
                <Text
                  type="bodyL"
                  style={[
                    isSelected && {
                      color: Colors[theme].inputBorderFocused,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {item.label}
                </Text>
                {item.subtitle && (
                  <Text
                    type="bodyS"
                    style={[
                      styles.subtitle,
                      { color: Colors[theme].textSecondary },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </View>

            {showCheckmark && isSelected && (
              <View
                style={[
                  styles.checkmark,
                  { backgroundColor: Colors[theme].inputBorderFocused },
                ]}
              >
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    backgroundColor: "transparent",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

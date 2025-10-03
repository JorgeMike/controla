import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
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
                backgroundColor: Colors[theme].background,
                borderColor: isSelected
                  ? Colors[theme].blue
                  : Colors[theme].text + "30",
              },
              itemStyle,
            ]}
            onPress={() => onSelect(item.id, item)}
            activeOpacity={0.7}
          >
            <View style={styles.itemContent}>
              {item.icon && (
                <View style={styles.iconContainer}>{item.icon}</View>
              )}
              <View style={styles.textContainer}>
                <Text type="bodyL">{item.label}</Text>
                {item.subtitle && (
                  <Text type="bodyS" style={styles.subtitle}>
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </View>

            {showCheckmark && isSelected && (
              <View
                style={[
                  styles.checkmark,
                  { backgroundColor: Colors[theme].blue },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "transparent",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 2,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

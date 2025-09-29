import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View as DefaultView } from "react-native";
import { Text, textVariants, View } from "../Themed";

export interface SummaryTitleProps {
  theme: "light" | "dark";

  title: string;
  amount: string;
  titleType?: keyof typeof textVariants;
  amountType?: keyof typeof textVariants;

  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
}

export default function SummaryTitle({
  theme,
  title,
  amount,
  iconName = "wallet",
  iconColor = Colors[theme].secondary,
  titleType = "h6",
  amountType = "h3",
}: SummaryTitleProps) {
  return (
    <View
      style={{
        marginTop: 20,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
      }}
    >
      <DefaultView
        style={{
          backgroundColor: iconColor + "25",
          padding: 8,
          borderRadius: 10,
        }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </DefaultView>
      <DefaultView>
        <Text type={titleType} style={{ color: iconColor }}>
          {title}
        </Text>
        <Text type={amountType}>{amount}</Text>
      </DefaultView>
    </View>
  );
}

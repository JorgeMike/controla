import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View as DefaultView, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";

export interface ActionbuttonProps {
  theme: "light" | "dark";
}

export default function Actionbutton({ theme }: ActionbuttonProps) {
  return (
    <Pressable style={styles.summaryCard}>
      {({ pressed }) => (
        <View style={[styles.cardContent, { opacity: pressed ? 0.7 : 1 }]}>
          <DefaultView
            style={{
              backgroundColor: Colors[theme].text + "25",
              padding: 8,
              borderRadius: 50,
              marginBottom: 8,
            }}
          >
            <Ionicons name="wallet" size={20} color={Colors[theme].text} />
          </DefaultView>
          <Text type="h5">Agregar Gastos</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
  },
  cardContent: {
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});

/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";

import Colors from "@/constants/Colors";
import { useAppTheme } from "@/contexts/ThemeContext";
import { ColorName } from "@/types/theme/colors";

type ThemeProps = {
  type?: keyof typeof textVariants;
  lightColor?: string;
  darkColor?: string;
  variant?: ColorName;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useAppTheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, type, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ color, ...textVariants[type ?? "default"] }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    props.variant ? props.variant : "surface"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const textVariants = StyleSheet.create({
  // Variantes básicas existentes
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },

  // Títulos por tamaño
  titleXXL: {
    fontSize: 48,
    fontWeight: "900",
    lineHeight: 52,
    letterSpacing: -1,
  },
  titleXL: {
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  titleL: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  titleM: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  titleS: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28,
  },
  titleXS: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },

  // Encabezados jerárquicos
  h1: {
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },

  // Texto de cuerpo por tamaño
  bodyXL: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  bodyL: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "400",
  },
  bodyM: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  bodyS: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  bodyXS: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
  },
  bodyXXS: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400",
  },

  // Variantes con diferentes pesos (mismo tamaño base 16px)
  light: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
  },
  regular: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  semibold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  extrabold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "800",
  },
  black: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "900",
  },

  // Etiquetas por tamaño
  labelXL: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  labelL: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  labelM: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  labelS: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  labelXS: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "500",
    letterSpacing: 0.75,
  },

  // Botones por tamaño
  buttonXL: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  buttonL: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  buttonM: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  buttonS: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  buttonXS: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Texto de interfaz
  navigation: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
  tab: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  menu: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },

  // Inputs y formularios
  input: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  inputLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "400",
  },
  inputSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  placeholder: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    opacity: 0.6,
  },
  helper: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },

  // Texto informativo
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    opacity: 0.7,
  },
  captionBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  footnote: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "400",
  },
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Métricas y números
  metricXL: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "800",
    letterSpacing: -1,
  },
  metricL: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  metricM: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "700",
    letterSpacing: -0.25,
  },
  metricS: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  metricXS: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },

  // Display text (para hero sections)
  displayXL: {
    fontSize: 64,
    lineHeight: 68,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  displayL: {
    fontSize: 56,
    lineHeight: 60,
    fontWeight: "900",
    letterSpacing: -1,
  },
  displayM: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "800",
    letterSpacing: -0.75,
  },
  displayS: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  // Texto especial
  quote: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "400",
    fontStyle: "italic",
  },
  quoteSmall: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    fontStyle: "italic",
  },
  code: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "monospace",
  },
  codeSmall: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "monospace",
  },

  // Lista de elementos
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  listItemSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  listItemLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "400",
  },

  // Cards
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  // Timestamps
  timestamp: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    opacity: 0.6,
  },
  timestampSmall: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400",
    opacity: 0.6,
  },
});

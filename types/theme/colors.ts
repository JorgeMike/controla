export type ColorName =
  | "purple"
  | "purpleLight"
  | "purpleDark"
  | "blue"
  | "blueLight"
  | "blueDark"
  | "green"
  | "greenLight"
  | "greenDark"
  | "orange"
  | "orangeLight"
  | "orangeDark"
  | "red"
  | "redLight"
  | "redDark"
  | "yellow"
  | "yellowLight"
  | "yellowDark"
  | "gray"
  | "grayLight"
  | "grayDark"
  | "background"
  | "backgroundSecondary"
  | "text"
  | "textSecondary"
  | "textInverse"
  | "surface"
  | "surfaceVariant"
  | "surfaceElevated"
  | "border"
  | "borderLight"
  | "borderDark"
  | "inputBackground"
  | "inputBorder"
  | "inputBorderFocused"
  | "inputText"
  | "card"
  | "cardHover"
  | "shadow"
  | "disabled"
  | "disabledText"
  | "placeholder"
  | "overlay"
  | "divider"
  | "dividerLight"
  | "success"
  | "successLight"
  | "error"
  | "errorLight"
  | "warning"
  | "warningLight"
  | "info"
  | "infoLight";

export type Hex = `#${string}`;

// Mapea las keys de ColorName a valores Hex
export type ColorMap = Readonly<Record<ColorName, Hex>>;

export interface ColorPalette {
  light: ColorMap;
  dark: ColorMap;
}

import { ColorOption } from "@/components/ui/ColorPicker";

const Colors = {
  light: {
    // Colores de marca y semánticos
    purple: "#9C27B0",
    purpleLight: "#E1BEE7",
    purpleDark: "#7B1FA2",

    blue: "#4A90E2",
    blueLight: "#90CAF9",
    blueDark: "#1976D2",

    green: "#4CAF50",
    greenLight: "#A5D6A7",
    greenDark: "#388E3C",

    orange: "#FF9800",
    orangeLight: "#FFB74D",
    orangeDark: "#F57C00",

    red: "#F44336",
    redLight: "#EF5350",
    redDark: "#D32F2F",

    yellow: "#FFEB3B",
    yellowLight: "#FFF59D",
    yellowDark: "#FBC02D",

    gray: "#9E9E9E",
    grayLight: "#E0E0E0",
    grayDark: "#616161",

    // Superficies y fondos
    background: "#efeef3",
    backgroundSecondary: "#f5f5f7",
    text: "#28272c",
    textSecondary: "#5f5e63",
    surface: "#ffffff",
    surfaceVariant: "#f8f8f8",
    surfaceElevated: "#ffffff",

    // Bordes
    border: "#e0e0e0",
    borderLight: "#f0f0f0",
    borderDark: "#d0d0d0",

    // Inputs
    inputBackground: "#fafafa",
    inputBorder: "#e0e0e0",
    inputBorderFocused: "#4A90E2",
    inputText: "#28272c",

    // Cards y elementos elevados
    card: "#ffffff",
    cardHover: "#fafafa",
    shadow: "#00000015",

    // Estados
    disabled: "#e0e0e0",
    disabledText: "#bdbdbd",
    placeholder: "#9e9e9e",
    overlay: "#00000080",

    // Divisores
    divider: "#e8e8e8",
    dividerLight: "#f0f0f0",

    // Éxito, advertencia, error
    success: "#4CAF50",
    successLight: "#E8F5E9",
    warning: "#FF9800",
    warningLight: "#FFF3E0",
    error: "#F44336",
    errorLight: "#FFEBEE",
    info: "#4A90E2",
    infoLight: "#E3F2FD",
  },

  dark: {
    // Colores de marca y semánticos
    purple: "#BB86FC",
    purpleLight: "#E1BEE7",
    purpleDark: "#6200EA",

    blue: "#5BA3F5",
    blueLight: "#90CAF9",
    blueDark: "#0D47A1",

    green: "#66BB6A",
    greenLight: "#A5D6A7",
    greenDark: "#2E7D32",

    orange: "#FFB74D",
    orangeLight: "#FFCC80",
    orangeDark: "#E65100",

    red: "#EF5350",
    redLight: "#E57373",
    redDark: "#C62828",

    yellow: "#FFF176",
    yellowLight: "#FFF59D",
    yellowDark: "#F9A825",

    gray: "#808080",
    grayLight: "#B0B0B0",
    grayDark: "#424242",

    // Superficies y fondos
    background: "#17161b",
    backgroundSecondary: "#1c1b20",
    text: "#ffffff",
    textSecondary: "#b8b7bc",
    surface: "#28272c",
    surfaceVariant: "#2f2e33",
    surfaceElevated: "#323137",

    // Bordes
    border: "#3a393e",
    borderLight: "#333238",
    borderDark: "#444349",

    // Inputs
    inputBackground: "#2a2930",
    inputBorder: "#3a393e",
    inputBorderFocused: "#5BA3F5",
    inputText: "#ffffff",

    // Cards y elementos elevados
    card: "#28272c",
    cardHover: "#2f2e33",
    shadow: "#00000040",

    // Estados
    disabled: "#3a393e",
    disabledText: "#5f5e63",
    placeholder: "#7a7980",
    overlay: "#000000cc",

    // Divisores
    divider: "#3a393e",
    dividerLight: "#333238",

    // Éxito, advertencia, error
    success: "#66BB6A",
    successLight: "#1B5E20",
    warning: "#FFB74D",
    warningLight: "#E65100",
    error: "#EF5350",
    errorLight: "#B71C1C",
    info: "#5BA3F5",
    infoLight: "#0D47A1",
  },
};

export const SEMANTIC_COLORS: ColorOption<keyof typeof Colors.light>[] = [
  { name: "purple", light: Colors.light.purple, dark: Colors.dark.purple },
  { name: "blue", light: Colors.light.blue, dark: Colors.dark.blue },
  { name: "green", light: Colors.light.green, dark: Colors.dark.green },
  { name: "orange", light: Colors.light.orange, dark: Colors.dark.orange },
  { name: "red", light: Colors.light.red, dark: Colors.dark.red },
  { name: "yellow", light: Colors.light.yellow, dark: Colors.dark.yellow },
  { name: "gray", light: Colors.light.gray, dark: Colors.dark.gray },
];

export default Colors;

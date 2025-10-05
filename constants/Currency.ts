type CurrencyAbreviation = "USD" | "EUR" | "MXN" | "COP" | "ARS" | "CLP";
type CurrencySymbol = "$" | "€";

interface Currency {
  label: string;
  value: CurrencyAbreviation;
  symbol: CurrencySymbol;
}

export const CURRENCY_OPTIONS_LABELS: Currency[] = [
  { label: "USD - Dólar", value: "USD", symbol: "$" },
  { label: "EUR - Euro", value: "EUR", symbol: "€" },
  { label: "MXN - Peso Mexicano", value: "MXN", symbol: "$" },
  { label: "COP - Peso Colombiano", value: "COP", symbol: "$" },
  { label: "ARS - Peso Argentino", value: "ARS", symbol: "$" },
  { label: "CLP - Peso Chileno", value: "CLP", symbol: "$" },
];

export const CURRENCY_OPTIONS_INDEXED: {
  [key: string]: { symbol: string; name: string };
} = CURRENCY_OPTIONS_LABELS.reduce((acc, curr) => {
  acc[curr.value] = { symbol: curr.symbol, name: curr.label };
  return acc;
}, {} as { [key: string]: { symbol: string; name: string } });

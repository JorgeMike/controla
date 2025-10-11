// constants/Categories.ts
import { ModalSelectOption } from "@/components/ui/ModalSelect";
import { IoniconsName } from "@/database/modules/BankAccounts/bankAccountsTypes";

export interface Category {
  label: string;
  value: string;
  icon: IoniconsName;
}

export const CATEGORIES: ModalSelectOption[] = [
  { label: "Comida", value: "food", icon: "restaurant" },
  { label: "Transporte", value: "transport", icon: "car" },
  { label: "Entretenimiento", value: "entertainment", icon: "game-controller" },
  { label: "Compras", value: "shopping", icon: "cart" },
  { label: "Salud", value: "health", icon: "medkit" },
  { label: "Educación", value: "education", icon: "school" },
  { label: "Vivienda", value: "housing", icon: "home" },
  { label: "Servicios", value: "services", icon: "construct" },
  { label: "Suscripciones", value: "subscriptions", icon: "repeat" },
  { label: "Ropa", value: "clothing", icon: "shirt" },
  { label: "Viajes", value: "travel", icon: "airplane" },
  { label: "Regalos", value: "gifts", icon: "gift" },
  { label: "Mascotas", value: "pets", icon: "paw" },
  { label: "Otros", value: "other", icon: "ellipsis-horizontal" },
];

export const CATEGORIES_INDEXED: {
  [key: string]: { icon: IoniconsName; name: string };
} = CATEGORIES.reduce((acc, curr) => {
  acc[curr.value] = { icon: curr.icon as IoniconsName, name: curr.label };
  return acc;
}, {} as { [key: string]: { icon: IoniconsName; name: string } });

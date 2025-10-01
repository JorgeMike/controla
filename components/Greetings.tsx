import DateUtils from "@/utils/date-uitls";
import { View as DefaultView } from "react-native";
import { Text } from "./Themed";

export default function Greetings({ name }: { name?: string }) {
  return (
    <DefaultView>
      <Text type="h1" style={{ marginTop: 25 }}>
        ¡Hola,{" "}
        <Text type="h1" style={{ fontWeight: "800" }}>
          {name ?? " de nuevo"}
        </Text>
        !
      </Text>
      <Text type="defaultSemiBold" style={{ marginTop: 5, opacity: 0.9 }}>
        Este es tu resumen de {DateUtils.getActualMonthName()}.
      </Text>
    </DefaultView>
  );
}

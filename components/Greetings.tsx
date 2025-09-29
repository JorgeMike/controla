import DateUtils from "@/utils/date-uitls";
import { View as DefaultView } from "react-native";
import { Text } from "./Themed";

export default function Greetings() {
  return (
    <DefaultView>
      <Text type="h1" style={{ marginTop: 25 }} lightColor="#ffffff">
        ¡Hola,{" "}
        <Text type="h1" style={{ fontWeight: "800" }} lightColor="#ffffff">
          Michael
        </Text>
        !
      </Text>
      <Text
        type="defaultSemiBold"
        style={{ marginTop: 5, opacity: 0.9 }}
        lightColor="#ffffff"
      >
        Este es tu resumen de {DateUtils.getActualMonthName()}.
      </Text>
    </DefaultView>
  );
}

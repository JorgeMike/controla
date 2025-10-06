import React from "react";
import { TouchableOpacity } from "react-native";
import SummaryTitle, { SummaryTitleProps } from "./SummaryTitle";

export interface PressableSummaryTitleProps extends SummaryTitleProps {
  onPress: () => void;
}

export default function PressableSummaryTitle({
  onPress,
  ...props
}: PressableSummaryTitleProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <SummaryTitle {...props} />
    </TouchableOpacity>
  );
}

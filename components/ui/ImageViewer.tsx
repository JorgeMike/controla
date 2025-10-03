import { Image, ImageStyle } from "expo-image";
import { ImageSourcePropType } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  style?: ImageStyle;
};

export default function ImageViewer({
  imgSource,
  selectedImage,
  style,
}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={[style]} />;
}

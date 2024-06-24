import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  variant?: "solid" | "outline";
  text: string;
  onPressHandler: () => void;
  children?: ReactNode;
}

function Button({ onPressHandler, text, children, variant = "solid" }: Props) {
  const btnClass =
    variant === "solid"
      ? "bg-[#2ab07c] rounded-lg justify-center items-center py-3"
      : "border-2 border-neutral-400 rounded-lg justify-center items-center py-3 flex-row space-x-2";
  const textClass =
    variant === "solid"
      ? "text-white font-bold text-lg"
      : "text-neutral-400 font-bold text-lg";

  return (
    <Pressable onPress={onPressHandler} className={btnClass}>
      {children && <View>{children}</View>}
      <Text className={textClass}>{text}</Text>
    </Pressable>
  );
}

export default Button;

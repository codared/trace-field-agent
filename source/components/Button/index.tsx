import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({
  onPress,
  style,
  title,
  titleStyle,
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#cccccc" : "#6B6EF8" },
        { opacity: disabled ? 0.6 : 1 },

        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View>{icon}</View>

      <Text
        style={[
          styles.buttonTitle,
          { color: disabled ? "#666666" : "#000000" },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

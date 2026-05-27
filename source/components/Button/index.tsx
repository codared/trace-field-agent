import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
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
  let backgroundColor = "#07B4D3";
  let titleColor = "#000000";
  let press = onPress;

  if (disabled) {
    backgroundColor = "#cccccc";
    titleColor = "#000000";
    press = () => {};
  }

  return (
    <Pressable>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }, style]}
        onPress={press}
        activeOpacity={0.7}
      >
        <View>{icon}</View>
        <Text style={[styles.buttonTitle, { color: titleColor }, titleStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

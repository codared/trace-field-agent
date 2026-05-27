import React from "react";
import { Text, TextInput, View } from "react-native";
import { Props } from "./types";
import { ErrorText } from "./ErrorText";

export const FormInput = ({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
}: Props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>{label}</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        keyboardType={keyboardType}
      />
      {error && <ErrorText message={error} />}
    </View>
  );
};

import React from "react";
import { Text } from "react-native";

export const ErrorText = ({ message }: { message: string }) => {
  return (
    <Text style={{ color: "red", marginTop: 4, fontSize: 12 }}>{message}</Text>
  );
};

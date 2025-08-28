import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SelectableField({
  value,
  placeholder,
  onPress,
  error = false,
}: {
  value: string;
  placeholder: string;
  onPress: () => void;
  error?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.button, error && styles.errorBorder]} onPress={onPress}>
      <Text style={styles.text}>{value ? value : placeholder}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorBorder: {
    borderWidth: 2,
    borderColor: "red",
  },
});

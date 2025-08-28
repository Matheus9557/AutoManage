import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

export default function InputField({
  value,
  onChangeText,
  placeholder,
  error,
  editable = true,
  mask,
  style, // 👈 permite customizar estilo
}: {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  error?: boolean;
  editable?: boolean;
  mask?: "cpf";
  style?: TextInputProps["style"];
}) {
  const handleChange = (text: string) => {
    let maskedText = text;

    if (mask === "cpf") {
      // remove tudo que não é número
      maskedText = text.replace(/\D/g, "");

      // aplica máscara 000.000.000-00
      if (maskedText.length > 3) maskedText = maskedText.replace(/^(\d{3})(\d)/, "$1.$2");
      if (maskedText.length > 6) maskedText = maskedText.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      if (maskedText.length > 9) maskedText = maskedText.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    }

    onChangeText?.(maskedText);
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholder={placeholder}
        placeholderTextColor="#000"
        value={value}
        onChangeText={handleChange}
        editable={editable}
        keyboardType={mask === "cpf" ? "number-pad" : "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: { width: "90%", marginVertical: 10 },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
    paddingHorizontal: 20,
    color: "#000000ff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputError: { borderWidth: 2, borderColor: "red" },
});

import React, { useState } from "react";
import { Platform, View, Text, TextInput, StyleSheet } from "react-native";
import { cores } from "../tema/tema";

export default function CampoTexto({ rotulo, multiline, onFocus, onBlur, ...resto }) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={estilos.campo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[estilos.input, multiline && estilos.multilinha, focado && estilos.focado]}
        placeholderTextColor={cores.textoSuave}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        onFocus={(e) => {
          setFocado(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocado(false);
          onBlur?.(e);
        }}
        {...resto}
      />
    </View>
  );
}

const semContornoWeb = Platform.OS === "web" ? { outlineStyle: "none" } : {};

const estilos = StyleSheet.create({
  campo: {
    marginBottom: 18,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: 6,
  },
  input: {
    ...semContornoWeb,
    backgroundColor: cores.cartao,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: cores.texto,
    borderWidth: 1.5,
    borderColor: cores.borda,
  },
  focado: {
    borderColor: cores.verde,
    backgroundColor: "#FFFFFF",
  },
  multilinha: {
    minHeight: 110,
  },
});

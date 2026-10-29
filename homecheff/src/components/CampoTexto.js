import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { cores } from "../tema/tema";

export default function CampoTexto({ rotulo, multiline, ...resto }) {
  return (
    <View style={estilos.campo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[estilos.input, multiline && estilos.multilinha]}
        placeholderTextColor={cores.textoSuave}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...resto}
      />
    </View>
  );
}

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
    backgroundColor: cores.cartao,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  multilinha: {
    minHeight: 100,
  },
});

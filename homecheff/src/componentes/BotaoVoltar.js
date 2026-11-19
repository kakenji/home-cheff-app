import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores } from "../tema/tema";

export default function BotaoVoltar({ onPress, texto = "Voltar" }) {
  return (
    <TouchableOpacity
      style={estilos.botao}
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={texto}
    >
      <Ionicons name="chevron-back" size={20} color={cores.verde} />
      <Text style={estilos.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },
  texto: {
    color: cores.verde,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 2,
  },
});

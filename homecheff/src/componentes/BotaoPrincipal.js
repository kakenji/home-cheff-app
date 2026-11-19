import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { cores } from "../tema/tema";

export default function BotaoPrincipal({ texto, onPress, tipo = "primario", carregando = false }) {
  return (
    <TouchableOpacity style={[estilos.botao, estilos[tipo], carregando && estilos.desabilitado]} onPress={onPress} disabled={carregando} activeOpacity={0.85} accessibilityRole="button">
      {carregando ? (
        <ActivityIndicator color={tipo === "primario" ? "#fff" : cores.verde} />
      ) : (
        <Text style={[estilos.texto, estilos[`texto_${tipo}`]]}>{texto}</Text>
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  primario: {
    backgroundColor: cores.verde,
  },
  secundario: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  perigo: {
    backgroundColor: cores.perigoClaro,
    borderWidth: 1,
    borderColor: cores.perigo,
  },
  desabilitado: {
    opacity: 0.7,
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
  },
  texto_primario: {
    color: "#fff",
  },
  texto_secundario: {
    color: cores.verde,
  },
  texto_perigo: {
    color: cores.perigo,
  },
});

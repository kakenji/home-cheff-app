import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { cores } from "../tema/tema";

export default function BotaoPrincipal({ texto, onPress, tipo = "primario" }) {
  return (
    <TouchableOpacity style={[estilos.botao, estilos[tipo]]} onPress={onPress}>
      <Text style={[estilos.texto, estilos[`texto_${tipo}`]]}>{texto}</Text>
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

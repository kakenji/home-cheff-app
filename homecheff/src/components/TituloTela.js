// Título grande com serifa e linha de apoio acima (padrão do protótipo).
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { cores, fonteTitulo } from "../tema/tema";

export default function TituloTela({ apoio, titulo, subtitulo }) {
  return (
    <View style={estilos.bloco}>
      {apoio ? <Text style={estilos.apoio}>{apoio}</Text> : null}
      <Text style={estilos.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  bloco: {
    marginBottom: 16,
  },
  apoio: {
    fontSize: 11,
    letterSpacing: 1.3,
    fontWeight: "700",
    color: cores.textoSuave,
    marginBottom: 4,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 30,
    fontWeight: "bold",
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 6,
    lineHeight: 20,
  },
});

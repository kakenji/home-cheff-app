import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores } from "../tema/tema";

export default function EstadoCarregamento({ carregando, erro, aoTentarNovamente }) {
  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color={cores.verde} />
      </View>
    );
  }
  if (erro) {
    return (
      <View style={estilos.centro}>
        <Ionicons name="cloud-offline-outline" size={36} color={cores.textoSuave} />
        <Text style={estilos.mensagem}>{erro}</Text>
        <TouchableOpacity style={estilos.botao} onPress={aoTentarNovamente}>
          <Text style={estilos.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: cores.fundo,
  },
  mensagem: {
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  botao: {
    marginTop: 16,
    backgroundColor: cores.verde,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});

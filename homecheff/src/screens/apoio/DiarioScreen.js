import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores, fonteTitulo } from "../../tema/tema";
import { ocorrencias } from "../../dados/mockData";

export default function DiarioScreen({ navigation }) {
  const lista = [...ocorrencias].reverse();

  function aoApagar(registro) {
    Alert.alert(
      "Apagar definitivamente?",
      "O registro será destruído e não poderá ser recuperado. Nesta etapa nada é apagado de verdade.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive" },
      ]
    );
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={<Text style={estilos.intro}>Um registro só seu. Nesta demonstração, nada é enviado para ninguém.</Text>}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum registro ainda. Toque em “+ Novo registro”.</Text>}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <TouchableOpacity style={estilos.corpo} onPress={() => navigation.navigate("NovaOcorrencia", { ocorrencia: item })}>
              <Text style={estilos.titulo}>{item.data} · {item.hora}</Text>
              <Text style={estilos.descricao} numberOfLines={2}>{item.descricao}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => aoApagar(item)} hitSlop={8} style={estilos.lixeira}>
              <Ionicons name="trash-outline" size={20} color={cores.perigo} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={estilos.botaoNovo} onPress={() => navigation.navigate("NovaOcorrencia")}>
        <Text style={estilos.botaoNovoTexto}>+ Novo registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  lista: {
    padding: 20,
    paddingBottom: 90,
  },
  intro: {
    fontSize: 14,
    color: cores.textoSuave,
    lineHeight: 20,
    marginBottom: 16,
  },
  vazio: {
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.bege,
    borderRadius: 18,
    borderLeftWidth: 5,
    borderLeftColor: cores.dourado,
    padding: 16,
    marginBottom: 12,
  },
  corpo: {
    flex: 1,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 16,
    fontWeight: "bold",
    color: cores.texto,
  },
  descricao: {
    fontSize: 14,
    color: cores.textoSuave,
    lineHeight: 20,
    marginTop: 6,
  },
  lixeira: {
    paddingLeft: 12,
  },
  botaoNovo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: cores.verde,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  botaoNovoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

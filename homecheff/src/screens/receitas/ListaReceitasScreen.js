// ============================================================
// CRUD 1 — RECEITAS (READ): lista as receitas ATIVAS (deletedAt
// nulo) e permite buscar por nome. A busca usa useState — o
// único estado do app além do modoApoio e do gatilho.
// ============================================================
import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TituloTela from "../../componentes/TituloTela";
import { cores, fonteTitulo } from "../../tema/tema";
import { receitasAtivas } from "../../dados/mockData";

export default function ListaReceitasScreen({ navigation }) {
  const [busca, setBusca] = useState("");
  const lista = receitasAtivas().filter((r) => r.titulo.toLowerCase().includes(busca.trim().toLowerCase()));

  return (
    <View style={estilos.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <TituloTela apoio="SEU CADERNO" titulo="Suas receitas" />
            <View style={estilos.busca}>
              <Ionicons name="search-outline" size={18} color={cores.textoSuave} />
              <TextInput
                style={estilos.buscaInput}
                placeholder="Buscar receita por nome"
                placeholderTextColor={cores.textoSuave}
                value={busca}
                onChangeText={setBusca}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhuma receita encontrada. Toque em “+ Nova receita” para cadastrar.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.card} onPress={() => navigation.navigate("DetalheReceita", { receitaId: item.id })}>
            <View style={estilos.foto}>
              <Ionicons name="restaurant-outline" size={26} color={cores.verde} />
            </View>
            <View style={estilos.info}>
              <Text style={estilos.categoria}>{item.categoria}</Text>
              <Text style={estilos.titulo}>{item.titulo}</Text>
              <Text style={estilos.meta}>{item.tempoPreparo} min · {item.ingredientes.length} ingredientes</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={cores.textoSuave} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={estilos.botaoNovo} onPress={() => navigation.navigate("NovaReceita")}>
        <Text style={estilos.botaoNovoTexto}>+ Nova receita</Text>
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
  busca: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.cartao,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buscaInput: {
    flex: 1,
    paddingVertical: 11,
    marginLeft: 8,
    fontSize: 14,
    color: cores.texto,
  },
  vazio: {
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 24,
    lineHeight: 19,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.cartao,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 12,
  },
  foto: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  categoria: {
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "700",
    color: cores.dourado,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 17,
    fontWeight: "bold",
    color: cores.texto,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 3,
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

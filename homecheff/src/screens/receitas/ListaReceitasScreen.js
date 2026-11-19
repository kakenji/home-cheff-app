import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TituloTela from "../../componentes/TituloTela";
import FotoReceita from "../../componentes/FotoReceita";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { listarReceitas } from "../../servicos/receitas";
import { cores, fonteTitulo, sombra, sombraForte } from "../../tema/tema";

export default function ListaReceitasScreen({ navigation }) {
  const [busca, setBusca] = useState("");
  const { dados: receitas, carregando, erro, recarregar } = useDadosDaApi(listarReceitas, []);
  const lista = receitas.filter((r) => r.titulo.toLowerCase().includes(busca.trim().toLowerCase()));

  if (erro || (carregando && receitas.length === 0)) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        keyboardShouldPersistTaps="handled"
        refreshing={carregando}
        onRefresh={recarregar}
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
            <FotoReceita uri={item.imagemUrl} style={estilos.foto} />
            <View style={estilos.info}>
              {item.categoria ? <Text style={estilos.categoria}>{item.categoria}</Text> : null}
              <Text style={estilos.titulo}>{item.titulo}</Text>
              <Text style={estilos.meta}>{item.tempoPreparo} min · {item.ingredientes.length} ingredientes</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={cores.textoSuave} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity activeOpacity={0.85} style={estilos.botaoNovo} onPress={() => navigation.navigate("NovaReceita")}>
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
    ...sombra,
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
    width: 64,
    height: 64,
    borderRadius: 16,
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
    ...sombraForte,
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

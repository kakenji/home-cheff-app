// ============================================================
// CRUD 1 — RECEITAS (READ do detalhe + UPDATE + DELETE): mostra
// ingredientes e modo de preparo. "Editar" abre o formulário
// preenchido; "Excluir" é SOFT DELETE (a API grava deleted_at e a
// receita some das listas, mas continua no banco).
// ============================================================
import React from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import TituloTela from "../../componentes/TituloTela";
import { cores } from "../../tema/tema";
import { buscarReceita } from "../../dados/mockData";

export default function DetalheReceitaScreen({ route, navigation }) {
  const receita = buscarReceita(route.params.receitaId);

  function aoExcluir() {
    Alert.alert("Excluir receita?", "Ela sai da sua lista. Nesta etapa nada é apagado de verdade — a exclusão lógica (deleted_at) vem com a API.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <TituloTela apoio={receita.categoria.toUpperCase()} titulo={receita.titulo} subtitulo={receita.descricao} />
      <Text style={estilos.meta}>{receita.tempoPreparo} min de preparo</Text>

      <Text style={estilos.secao}>Ingredientes</Text>
      <View style={estilos.card}>
        {receita.ingredientes.map((ing, i) => (
          <Text key={i} style={estilos.ingrediente}>• {ing}</Text>
        ))}
      </View>

      <Text style={estilos.secao}>Modo de preparo</Text>
      <View style={estilos.card}>
        {receita.modoPreparo.map((passo, i) => (
          <View key={i} style={estilos.linhaPasso}>
            <Text style={estilos.numeroPasso}>{i + 1}</Text>
            <Text style={estilos.textoPasso}>{passo}</Text>
          </View>
        ))}
      </View>

      <BotaoPrincipal texto="Editar receita" onPress={() => navigation.navigate("NovaReceita", { receita })} />
      <BotaoPrincipal texto="Excluir receita" tipo="perigo" onPress={aoExcluir} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 48,
  },
  meta: {
    fontSize: 13,
    color: cores.textoSuave,
    marginBottom: 18,
  },
  secao: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.textoSuave,
    marginBottom: 8,
    marginTop: 6,
  },
  card: {
    backgroundColor: cores.cartao,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 16,
  },
  ingrediente: {
    fontSize: 14,
    color: cores.texto,
    paddingVertical: 4,
  },
  linhaPasso: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  numeroPasso: {
    width: 24,
    fontWeight: "700",
    color: cores.verde,
  },
  textoPasso: {
    flex: 1,
    fontSize: 14,
    color: cores.texto,
    lineHeight: 20,
  },
});

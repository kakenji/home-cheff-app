import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TituloTela from "../../componentes/TituloTela";
import { cores, fonteTitulo } from "../../tema/tema";
import { itensCompra, despensa } from "../../dados/mockData";

const filtros = ["Tudo", "Geladeira", "Armário"];

export default function ListaComprasScreen({ navigation }) {
  const faltam = itensCompra.filter((c) => !c.comprado);
  const comprados = itensCompra.filter((c) => c.comprado);

  function linha(c) {
    return (
      <TouchableOpacity key={c.id} style={estilos.linha} onPress={() => navigation.navigate("NovoItemCompra", { itemCompra: c })}>
        <Ionicons name={c.comprado ? "checkmark-circle" : "ellipse-outline"} size={26} color={c.comprado ? cores.verde : cores.borda} />
        <View style={estilos.info}>
          <Text style={[estilos.nome, c.comprado && estilos.nomeComprado]}>{c.nome}</Text>
          {c.quantidade ? <Text style={estilos.quantidade}>{c.quantidade}</Text> : null}
        </View>
        <Ionicons name="chevron-forward" size={16} color={cores.textoSuave} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <TituloTela apoio="SUA COZINHA" titulo="Sua despensa" />

        <View style={estilos.destaque}>
          <Text style={estilos.destaqueApoio}>TUDO À MÃO</Text>
          <Text style={estilos.destaqueTitulo}>Cozinhe com o que tem</Text>
          <Text style={estilos.destaqueSub}>{despensa.length} ingredientes esperando por uma receita.</Text>
        </View>

        <View style={estilos.linhaSecao}>
          <Text style={estilos.secao}>O que tem em casa</Text>
          <View style={estilos.contador}><Text style={estilos.contadorTexto}>{despensa.length}</Text></View>
        </View>

        <View style={estilos.filtros}>
          {filtros.map((f, i) => (
            <View key={f} style={[estilos.chip, i === 0 && estilos.chipAtivo]}>
              <Text style={[estilos.chipTexto, i === 0 && estilos.chipTextoAtivo]}>{f}</Text>
            </View>
          ))}
        </View>

        <View style={estilos.grade}>
          {despensa.map((d) => (
            <View key={d.id} style={estilos.cardItem}>
              <Text style={estilos.itemNome}>{d.nome}</Text>
              <View style={estilos.itemRodape}>
                <Text style={estilos.itemNota} numberOfLines={1}>{d.nota}</Text>
                <Text style={estilos.itemQtd}>{d.quantidade}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[estilos.secao, { marginTop: 8, marginBottom: 4 }]}>Lista de compras</Text>
        <Text style={estilos.subSecao}>{faltam.length} itens faltam comprar</Text>

        <View style={estilos.cartaoLista}>
          {faltam.length === 0 ? <Text style={estilos.vazio}>Tudo comprado! Toque em “+ Adicionar item” para anotar algo novo.</Text> : faltam.map(linha)}
        </View>

        {comprados.length > 0 ? (
          <View>
            <Text style={[estilos.secao, { marginBottom: 8 }]}>Já comprados</Text>
            <View style={[estilos.cartaoLista, { backgroundColor: cores.cartao }]}>{comprados.map(linha)}</View>
          </View>
        ) : null}
      </ScrollView>

      <TouchableOpacity style={estilos.botaoNovo} onPress={() => navigation.navigate("NovoItemCompra")}>
        <Text style={estilos.botaoNovoTexto}>+ Adicionar item</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 90,
  },
  destaque: {
    backgroundColor: cores.verdeClaro,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  destaqueApoio: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: "700",
    color: cores.verde,
  },
  destaqueTitulo: {
    fontFamily: fonteTitulo,
    fontSize: 20,
    fontWeight: "bold",
    color: cores.texto,
    marginTop: 4,
  },
  destaqueSub: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 4,
  },
  linhaSecao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contador: {
    marginLeft: 8,
    backgroundColor: cores.verdeClaro,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  contadorTexto: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.verde,
  },
  filtros: {
    flexDirection: "row",
    marginBottom: 12,
  },
  chip: {
    backgroundColor: cores.verdeClaro,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipAtivo: {
    backgroundColor: cores.verde,
  },
  chipTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: cores.textoSuave,
  },
  chipTextoAtivo: {
    color: "#fff",
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardItem: {
    width: "48%",
    backgroundColor: cores.cartao,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 10,
  },
  itemNome: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.texto,
  },
  itemRodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  itemNota: {
    flex: 1,
    fontSize: 10,
    color: cores.textoSuave,
    marginRight: 6,
  },
  itemQtd: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.texto,
  },
  subSecao: {
    fontSize: 12,
    color: cores.textoSuave,
    marginBottom: 10,
  },
  cartaoLista: {
    backgroundColor: cores.bege,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#E9D9C3",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nome: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.texto,
  },
  nomeComprado: {
    textDecorationLine: "line-through",
    color: cores.textoSuave,
    fontWeight: "500",
  },
  quantidade: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 2,
  },
  secao: {
    fontFamily: fonteTitulo,
    fontSize: 19,
    fontWeight: "bold",
    color: cores.texto,
  },
  vazio: {
    paddingVertical: 20,
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 13,
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

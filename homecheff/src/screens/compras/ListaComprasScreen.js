import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TituloTela from "../../componentes/TituloTela";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import { avisarErro } from "../../componentes/alertas";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { listarItensCompra, atualizarItemCompra } from "../../servicos/itensCompra";
import { cores, fonteTitulo, sombra, sombraForte } from "../../tema/tema";

const filtros = ["Tudo", "Geladeira", "Armário", "Freezer"];

export default function ListaComprasScreen({ navigation }) {
  const [filtro, setFiltro] = useState("Tudo");
  const { dados: itens, setDados: setItens, carregando, erro, recarregar } = useDadosDaApi(listarItensCompra, []);

  const faltam = itens.filter((c) => !c.comprado);
  const despensa = itens.filter((c) => c.comprado);
  const despensaFiltrada = despensa.filter((d) => filtro === "Tudo" || d.local === filtro);

  async function alternarComprado(item) {
    const comprado = !item.comprado;
    setItens((atuais) => atuais.map((i) => (i.id === item.id ? { ...i, comprado } : i)));
    try {
      await atualizarItemCompra(item.id, { comprado });
    } catch (e) {
      setItens((atuais) => atuais.map((i) => (i.id === item.id ? { ...i, comprado: item.comprado } : i)));
      avisarErro(e, "Não foi possível atualizar");
    }
  }

  function linha(c) {
    return (
      <View key={c.id} style={estilos.linha}>
        <TouchableOpacity onPress={() => alternarComprado(c)} hitSlop={8}>
          <Ionicons name={c.comprado ? "checkmark-circle" : "ellipse-outline"} size={26} color={c.comprado ? cores.verde : cores.borda} />
        </TouchableOpacity>
        <TouchableOpacity style={estilos.info} onPress={() => navigation.navigate("NovoItemCompra", { itemCompra: c })}>
          <Text style={[estilos.nome, c.comprado && estilos.nomeComprado]}>{c.nome}</Text>
          {c.quantidade ? <Text style={estilos.quantidade}>{c.quantidade}</Text> : null}
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={16} color={cores.textoSuave} />
      </View>
    );
  }

  if (erro || (carregando && itens.length === 0)) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  return (
    <View style={estilos.container}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        refreshControl={<RefreshControl refreshing={carregando} onRefresh={recarregar} tintColor={cores.verde} />}
      >
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
          {filtros.map((f) => (
            <TouchableOpacity key={f} style={[estilos.chip, filtro === f && estilos.chipAtivo]} onPress={() => setFiltro(f)}>
              <Text style={[estilos.chipTexto, filtro === f && estilos.chipTextoAtivo]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.grade}>
          {despensaFiltrada.length === 0 ? (
            <Text style={[estilos.vazio, { width: "100%" }]}>Nada por aqui. Marque itens da lista como comprados.</Text>
          ) : (
            despensaFiltrada.map((d) => (
              <TouchableOpacity key={d.id} style={estilos.cardItem} onPress={() => navigation.navigate("NovoItemCompra", { itemCompra: d })}>
                <Text style={estilos.itemNome}>{d.nome}</Text>
                <View style={estilos.itemRodape}>
                  <Text style={estilos.itemNota} numberOfLines={1}>{d.local || "Sem local"}</Text>
                  <Text style={estilos.itemQtd}>{d.quantidade}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Text style={[estilos.secao, { marginTop: 8, marginBottom: 4 }]}>Lista de compras</Text>
        <Text style={estilos.subSecao}>{faltam.length} itens faltam comprar · toque no círculo para marcar</Text>

        <View style={estilos.cartaoLista}>
          {faltam.length === 0 ? <Text style={estilos.vazio}>Tudo comprado! Toque em “+ Adicionar item” para anotar algo novo.</Text> : faltam.map(linha)}
        </View>
      </ScrollView>

      <TouchableOpacity activeOpacity={0.85} style={estilos.botaoNovo} onPress={() => navigation.navigate("NovoItemCompra")}>
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
    ...sombra,
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
    ...sombra,
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

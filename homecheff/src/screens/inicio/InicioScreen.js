import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CabecalhoHomeCheff from "../../componentes/CabecalhoHomeCheff";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { cores, fonteTitulo } from "../../tema/tema";
import { receitasAtivas, itensCompra, usuario } from "../../dados/mockData";

export default function InicioScreen({ navigation }) {
  const ideia = receitasAtivas()[0];
  const faltam = itensCompra.filter((c) => !c.comprado).length;

  return (
    <View style={estilos.container}>
      <CabecalhoHomeCheff />
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.data}>SÁBADO, 24 DE OUTUBRO</Text>
        <Text style={estilos.saudacao}>Oi, {usuario.nome}.</Text>
        <Text style={estilos.pergunta}>O que vai sair da sua cozinha hoje?</Text>

        <View style={estilos.linhaSecao}>
          <Text style={estilos.secao}>Uma ideia pra hoje</Text>
        </View>

        <View style={estilos.cartaoIdeia}>
          <View style={estilos.foto}>
            <Ionicons name="restaurant-outline" size={56} color={cores.verde} />
          </View>
          <View style={estilos.corpoIdeia}>
            <Text style={estilos.categoria}>{ideia.categoria}</Text>
            <Text style={estilos.tituloReceita}>{ideia.titulo}</Text>
            <Text style={estilos.descricao}>{ideia.descricao}</Text>
            <Text style={estilos.meta}>{ideia.tempoPreparo} min · {ideia.ingredientes.length} ingredientes</Text>
            <BotaoPrincipal
              texto="Ver receita"
              onPress={() => navigation.navigate("Receitas", { screen: "DetalheReceita", params: { receitaId: ideia.id } })}
            />
          </View>
        </View>

        <View style={estilos.atalhos}>
          <TouchableOpacity style={[estilos.atalho, { backgroundColor: cores.verdeClaro }]} onPress={() => navigation.navigate("Receitas")}>
            <Ionicons name="book-outline" size={20} color={cores.verde} />
            <View style={{ marginLeft: 10 }}>
              <Text style={estilos.atalhoTitulo}>Minhas receitas</Text>
              <Text style={estilos.atalhoSub}>{receitasAtivas().length} salvas</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[estilos.atalho, { backgroundColor: cores.bege }]} onPress={() => navigation.navigate("Despensa")}>
            <Ionicons name="cart-outline" size={20} color={cores.dourado} />
            <View style={{ marginLeft: 10 }}>
              <Text style={estilos.atalhoTitulo}>Lista de compras</Text>
              <Text style={estilos.atalhoSub}>{faltam} itens faltam</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={estilos.rodape}>Uma panela só, ingredientes frescos e um jantar sem pressa.</Text>
      </ScrollView>
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
    paddingBottom: 32,
  },
  data: {
    fontSize: 11,
    letterSpacing: 1.3,
    fontWeight: "700",
    color: cores.textoSuave,
  },
  saudacao: {
    fontFamily: fonteTitulo,
    fontSize: 32,
    fontWeight: "bold",
    color: cores.texto,
    marginTop: 4,
  },
  pergunta: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 4,
  },
  linhaSecao: {
    marginTop: 22,
    marginBottom: 10,
  },
  secao: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.textoSuave,
  },
  cartaoIdeia: {
    backgroundColor: cores.cartao,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: "hidden",
  },
  foto: {
    height: 150,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  corpoIdeia: {
    padding: 18,
  },
  categoria: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: "700",
    color: cores.dourado,
  },
  tituloReceita: {
    fontFamily: fonteTitulo,
    fontSize: 24,
    fontWeight: "bold",
    color: cores.texto,
    marginTop: 4,
  },
  descricao: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 6,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 12,
    marginBottom: 4,
  },
  atalhos: {
    flexDirection: "row",
    marginTop: 14,
  },
  atalho: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    marginRight: 10,
  },
  atalhoTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.texto,
  },
  atalhoSub: {
    fontSize: 11,
    color: cores.textoSuave,
    marginTop: 2,
  },
  rodape: {
    textAlign: "center",
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 16,
  },
});

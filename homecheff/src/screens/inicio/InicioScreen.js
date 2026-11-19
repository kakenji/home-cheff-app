import React, { useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CabecalhoHomeCheff from "../../componentes/CabecalhoHomeCheff";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import FotoReceita from "../../componentes/FotoReceita";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { buscarUsuarioAtual } from "../../servicos/usuarios";
import { listarReceitas } from "../../servicos/receitas";
import { listarItensCompra } from "../../servicos/itensCompra";
import { cores, fonteTitulo, sombra } from "../../tema/tema";

const DIAS = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];
const MESES = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

function dataDeHoje() {
  const hoje = new Date();
  return `${DIAS[hoje.getDay()]}, ${hoje.getDate()} DE ${MESES[hoje.getMonth()]}`;
}

export default function InicioScreen({ navigation }) {
  const buscar = useCallback(async () => {
    const [usuario, receitas, itens] = await Promise.all([buscarUsuarioAtual(), listarReceitas(), listarItensCompra()]);
    return { usuario, receitas, faltam: itens.filter((c) => !c.comprado).length };
  }, []);
  const { dados, carregando, erro, recarregar } = useDadosDaApi(buscar);

  if (!dados) {
    return (
      <View style={estilos.container}>
        <CabecalhoHomeCheff />
        <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />
      </View>
    );
  }

  const { usuario, receitas, faltam } = dados;
  const ideia = receitas[0];

  return (
    <View style={estilos.container}>
      <CabecalhoHomeCheff />
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        refreshControl={<RefreshControl refreshing={carregando} onRefresh={recarregar} tintColor={cores.verde} />}
      >
        <Text style={estilos.data}>{dataDeHoje()}</Text>
        <Text style={estilos.saudacao}>Oi, {usuario.nome}.</Text>
        <Text style={estilos.pergunta}>O que vai sair da sua cozinha hoje?</Text>

        <View style={estilos.linhaSecao}>
          <Text style={estilos.secao}>Uma ideia pra hoje</Text>
        </View>

        {ideia ? (
          <View style={estilos.cartaoIdeia}>
            <FotoReceita uri={ideia.imagemUrl} style={estilos.foto} tamanhoIcone={56} />
            <View style={estilos.corpoIdeia}>
              {ideia.categoria ? <Text style={estilos.categoria}>{ideia.categoria}</Text> : null}
              <Text style={estilos.tituloReceita}>{ideia.titulo}</Text>
              {ideia.descricao ? <Text style={estilos.descricao}>{ideia.descricao}</Text> : null}
              <Text style={estilos.meta}>{ideia.tempoPreparo} min · {ideia.ingredientes.length} ingredientes</Text>
              <BotaoPrincipal
                texto="Ver receita"
                onPress={() => navigation.navigate("Receitas", { screen: "DetalheReceita", params: { receitaId: ideia.id }, initial: false })}
              />
            </View>
          </View>
        ) : (
          <View style={[estilos.cartaoIdeia, estilos.corpoIdeia]}>
            <Text style={estilos.descricao}>Você ainda não tem receitas salvas. Que tal cadastrar a primeira?</Text>
            <BotaoPrincipal texto="Nova receita" onPress={() => navigation.navigate("Receitas", { screen: "NovaReceita", initial: false })} />
          </View>
        )}

        <View style={estilos.atalhos}>
          <TouchableOpacity style={[estilos.atalho, { backgroundColor: cores.verdeClaro }]} onPress={() => navigation.navigate("Receitas")}>
            <Ionicons name="book-outline" size={20} color={cores.verde} />
            <View style={{ marginLeft: 10 }}>
              <Text style={estilos.atalhoTitulo}>Minhas receitas</Text>
              <Text style={estilos.atalhoSub}>{receitas.length} salvas</Text>
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
    ...sombra,
    backgroundColor: cores.cartao,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: "hidden",
  },
  foto: {
    height: 180,
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

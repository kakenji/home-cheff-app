import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import TituloTela from "../../componentes/TituloTela";
import FotoReceita from "../../componentes/FotoReceita";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import { avisarErro, confirmar } from "../../componentes/alertas";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { buscarReceita, excluirReceita } from "../../servicos/receitas";
import { cores, sombra } from "../../tema/tema";

export default function DetalheReceitaScreen({ route, navigation }) {
  const { receitaId } = route.params;
  const buscar = useCallback(() => buscarReceita(receitaId), [receitaId]);
  const { dados: receita, carregando, erro, recarregar } = useDadosDaApi(buscar);
  const [excluindo, setExcluindo] = useState(false);

  function aoExcluir() {
    confirmar("Excluir receita?", "Ela sai da sua lista (exclusão lógica: a API marca deletedAt).", "Excluir", async () => {
      setExcluindo(true);
      try {
        await excluirReceita(receitaId);
        navigation.goBack();
      } catch (e) {
        setExcluindo(false);
        avisarErro(e, "Não foi possível excluir");
      }
    });
  }

  if (!receita) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <FotoReceita uri={receita.imagemUrl} style={[estilos.capa, sombra]} tamanhoIcone={48} />
      <TituloTela apoio={receita.categoria ? receita.categoria.toUpperCase() : null} titulo={receita.titulo} subtitulo={receita.descricao} />
      <View style={estilos.chips}>
        <View style={estilos.chip}>
          <Ionicons name="time-outline" size={14} color={cores.verde} />
          <Text style={estilos.chipTexto}>{receita.tempoPreparo} min</Text>
        </View>
        <View style={estilos.chip}>
          <Ionicons name="nutrition-outline" size={14} color={cores.verde} />
          <Text style={estilos.chipTexto}>{receita.ingredientes.length} ingredientes</Text>
        </View>
        <View style={estilos.chip}>
          <Ionicons name="list-outline" size={14} color={cores.verde} />
          <Text style={estilos.chipTexto}>{receita.modoPreparo.length} passos</Text>
        </View>
      </View>

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
      <BotaoPrincipal texto="Excluir receita" tipo="perigo" onPress={aoExcluir} carregando={excluindo} />
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
  capa: {
    height: 210,
    borderRadius: 24,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.verdeClaro,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipTexto: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
    color: cores.verdeEscuro,
  },
  secao: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.textoSuave,
    marginBottom: 8,
    marginTop: 6,
  },
  card: {
    ...sombra,
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
    height: 24,
    borderRadius: 12,
    backgroundColor: cores.verdeClaro,
    textAlign: "center",
    lineHeight: 24,
    fontSize: 12,
    fontWeight: "700",
    color: cores.verde,
    marginRight: 10,
    overflow: "hidden",
  },
  textoPasso: {
    flex: 1,
    fontSize: 14,
    color: cores.texto,
    lineHeight: 20,
  },
});

// ============================================================
// CRUD 1 — RECEITAS (CREATE e UPDATE): título, ingredientes (um por
// linha, com a quantidade — é assim que a usuária ajusta uma
// quantidade na edição) e modo de preparo (um passo por linha).
// Com o parâmetro "receita" os campos vêm preenchidos.
// ============================================================
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarEntrega2 } from "../../componentes/alertas";
import { cores } from "../../tema/tema";

export default function NovaReceitaScreen({ route, navigation }) {
  const receita = route.params?.receita;

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Título" placeholder="Ex.: Orzo cremoso de limão" defaultValue={receita?.titulo} />
      <CampoTexto rotulo="Descrição (opcional)" placeholder="Uma frase sobre a receita" defaultValue={receita?.descricao} />
      <CampoTexto
        rotulo="Tempo de preparo (min)"
        placeholder="20"
        keyboardType="number-pad"
        defaultValue={receita ? String(receita.tempoPreparo) : undefined}
      />
      <CampoTexto
        rotulo="Ingredientes (um por linha, com a quantidade)"
        placeholder={"1 xícara de orzo\n1 limão-siciliano"}
        multiline
        defaultValue={receita?.ingredientes.join("\n")}
      />
      <CampoTexto
        rotulo="Modo de preparo (um passo por linha)"
        placeholder={"Refogue o orzo no azeite.\nCubra com água quente."}
        multiline
        defaultValue={receita?.modoPreparo.join("\n")}
      />
      <BotaoPrincipal texto={receita ? "Salvar alterações" : "Salvar receita"} onPress={() => avisarEntrega2(navigation, "Salvar a receita")} />
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
    paddingBottom: 60,
  },
});

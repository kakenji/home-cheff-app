import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import SeletorFoto from "../../componentes/SeletorFoto";
import { avisarErro } from "../../componentes/alertas";
import { criarReceita, atualizarReceita } from "../../servicos/receitas";
import { cores } from "../../tema/tema";

function linhas(texto) {
  return texto.split("\n").map((l) => l.trim()).filter(Boolean);
}

export default function NovaReceitaScreen({ route, navigation }) {
  const receita = route.params?.receita;
  const [titulo, setTitulo] = useState(receita?.titulo ?? "");
  const [categoria, setCategoria] = useState(receita?.categoria ?? "");
  const [descricao, setDescricao] = useState(receita?.descricao ?? "");
  const [tempoPreparo, setTempoPreparo] = useState(receita ? String(receita.tempoPreparo) : "");
  const [ingredientes, setIngredientes] = useState(receita?.ingredientes.join("\n") ?? "");
  const [modoPreparo, setModoPreparo] = useState(receita?.modoPreparo.join("\n") ?? "");
  const [imagemUrl, setImagemUrl] = useState(receita?.imagemUrl ?? "");
  const [salvando, setSalvando] = useState(false);

  async function aoSalvar() {
    const dados = {
      titulo,
      categoria,
      descricao,
      tempoPreparo: Number(tempoPreparo),
      ingredientes: linhas(ingredientes),
      modoPreparo: linhas(modoPreparo),
      imagemUrl: imagemUrl.trim(),
    };
    setSalvando(true);
    try {
      if (receita) {
        await atualizarReceita(receita.id, dados);
      } else {
        await criarReceita(dados);
      }
      navigation.goBack();
    } catch (e) {
      avisarErro(e);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Título" placeholder="Ex.: Orzo cremoso de limão" value={titulo} onChangeText={setTitulo} />
      <CampoTexto rotulo="Categoria (opcional)" placeholder="Ex.: Jantar sem complicação" value={categoria} onChangeText={setCategoria} />
      <CampoTexto rotulo="Descrição (opcional)" placeholder="Uma frase sobre a receita" value={descricao} onChangeText={setDescricao} />
      <SeletorFoto valor={imagemUrl} aoMudar={setImagemUrl} />
      <CampoTexto
        rotulo="Tempo de preparo (min)"
        placeholder="20"
        keyboardType="number-pad"
        value={tempoPreparo}
        onChangeText={setTempoPreparo}
      />
      <CampoTexto
        rotulo="Ingredientes (um por linha, com a quantidade)"
        placeholder={"1 xícara de orzo\n1 limão-siciliano"}
        multiline
        value={ingredientes}
        onChangeText={setIngredientes}
      />
      <CampoTexto
        rotulo="Modo de preparo (um passo por linha)"
        placeholder={"Refogue o orzo no azeite.\nCubra com água quente."}
        multiline
        value={modoPreparo}
        onChangeText={setModoPreparo}
      />
      <BotaoPrincipal texto={receita ? "Salvar alterações" : "Salvar receita"} onPress={aoSalvar} carregando={salvando} />
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

import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarErro, confirmar } from "../../componentes/alertas";
import { criarOcorrencia, atualizarOcorrencia, apagarOcorrencia } from "../../servicos/ocorrencias";
import { cores } from "../../tema/tema";

function doisDigitos(n) {
  return String(n).padStart(2, "0");
}

function agora() {
  const d = new Date();
  return {
    data: `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${d.getFullYear()}`,
    hora: `${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`,
  };
}

export default function NovaOcorrenciaScreen({ route, navigation }) {
  const ocorrencia = route.params?.ocorrencia;
  const inicial = ocorrencia ?? agora();
  const [data, setData] = useState(inicial.data);
  const [hora, setHora] = useState(inicial.hora);
  const [descricao, setDescricao] = useState(ocorrencia?.descricao ?? "");
  const [acao, setAcao] = useState(null);

  async function executar(nomeAcao, tarefa) {
    setAcao(nomeAcao);
    try {
      await tarefa();
      navigation.goBack();
    } catch (e) {
      avisarErro(e);
    } finally {
      setAcao(null);
    }
  }

  function aoSalvar() {
    const dados = { data, hora, descricao };
    executar("salvar", () => (ocorrencia ? atualizarOcorrencia(ocorrencia.id, dados) : criarOcorrencia(dados)));
  }

  function aoApagar() {
    confirmar("Apagar definitivamente?", "O registro será destruído e não poderá ser recuperado.", "Apagar", () =>
      executar("apagar", () => apagarOcorrencia(ocorrencia.id))
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Data" placeholder="dd/mm/aaaa" value={data} onChangeText={setData} />
      <CampoTexto rotulo="Hora" placeholder="hh:mm" keyboardType="numbers-and-punctuation" value={hora} onChangeText={setHora} />
      <CampoTexto rotulo="O que aconteceu" placeholder="Escreva com suas palavras" multiline value={descricao} onChangeText={setDescricao} />
      <BotaoPrincipal texto={ocorrencia ? "Salvar alterações" : "Salvar registro"} onPress={aoSalvar} carregando={acao === "salvar"} />
      {ocorrencia ? <BotaoPrincipal texto="Apagar definitivamente" tipo="perigo" onPress={aoApagar} carregando={acao === "apagar"} /> : null}
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

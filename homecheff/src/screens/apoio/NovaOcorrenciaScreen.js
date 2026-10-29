import React from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarEntrega2 } from "../../componentes/alertas";
import { cores } from "../../tema/tema";

export default function NovaOcorrenciaScreen({ route, navigation }) {
  const ocorrencia = route.params?.ocorrencia;

  function aoApagar() {
    Alert.alert("Apagar definitivamente?", "O registro será destruído e não poderá ser recuperado.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: () => avisarEntrega2(navigation, "Apagar o registro") },
    ]);
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Data" placeholder="dd/mm/aaaa" defaultValue={ocorrencia?.data} />
      <CampoTexto rotulo="Hora" placeholder="hh:mm" keyboardType="numbers-and-punctuation" defaultValue={ocorrencia?.hora} />
      <CampoTexto rotulo="O que aconteceu" placeholder="Escreva com suas palavras" multiline defaultValue={ocorrencia?.descricao} />
      <BotaoPrincipal texto={ocorrencia ? "Salvar alterações" : "Salvar registro"} onPress={() => avisarEntrega2(navigation, "Salvar o registro")} />
      {ocorrencia ? <BotaoPrincipal texto="Apagar definitivamente" tipo="perigo" onPress={aoApagar} /> : null}
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

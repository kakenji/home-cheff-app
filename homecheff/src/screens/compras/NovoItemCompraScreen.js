import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarEntrega2 } from "../../componentes/alertas";
import { cores } from "../../tema/tema";
import { criarItemCompra, atualizarItemCompra, entrouNaAreaSegura } from "../../servicos/apiSimulada";

export default function NovoItemCompraScreen({ route, navigation, aoEntrarNoApoio }) {
  const itemCompra = route.params?.itemCompra;
  const [nome, setNome] = useState(itemCompra?.nome ?? "");

  function aoSalvar() {
    if (nome.trim() === "") {
      Alert.alert("Falta o nome", "Digite o nome do item para salvar.");
      return;
    }
    const resposta = itemCompra ? atualizarItemCompra(itemCompra.id, nome) : criarItemCompra(nome);
    if (entrouNaAreaSegura(resposta)) {
      aoEntrarNoApoio();
      return;
    }
    avisarEntrega2(navigation, "Salvar o item");
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Item" placeholder="Ex.: Leite integral" value={nome} onChangeText={setNome} />
      <CampoTexto rotulo="Quantidade (opcional)" placeholder="Ex.: 2 L" defaultValue={itemCompra?.quantidade} />

      <BotaoPrincipal texto={itemCompra ? "Salvar alterações" : "Adicionar à lista"} onPress={aoSalvar} />
      {itemCompra && !itemCompra.comprado ? (
        <BotaoPrincipal texto="Marcar como comprado" tipo="secundario" onPress={() => avisarEntrega2(navigation, "Marcar o item como comprado")} />
      ) : null}
      {itemCompra ? (
        <BotaoPrincipal texto="Remover da lista" tipo="perigo" onPress={() => avisarEntrega2(navigation, "Remover o item")} />
      ) : null}
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

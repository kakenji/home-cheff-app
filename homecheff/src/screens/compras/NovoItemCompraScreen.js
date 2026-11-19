import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarErro, confirmar } from "../../componentes/alertas";
import { criarItemCompra, atualizarItemCompra, removerItemCompra, entrouNaAreaSegura } from "../../servicos/itensCompra";
import { cores } from "../../tema/tema";

const locais = ["Geladeira", "Armário", "Freezer"];

export default function NovoItemCompraScreen({ route, navigation, aoEntrarNoApoio }) {
  const itemCompra = route.params?.itemCompra;
  const [nome, setNome] = useState(itemCompra?.nome ?? "");
  const [quantidade, setQuantidade] = useState(itemCompra?.quantidade ?? "");
  const [local, setLocal] = useState(itemCompra?.local ?? "");
  const [acao, setAcao] = useState(null);

  async function executar(nomeAcao, tarefa) {
    setAcao(nomeAcao);
    try {
      await tarefa();
    } catch (e) {
      avisarErro(e);
    } finally {
      setAcao(null);
    }
  }

  function aoSalvar() {
    executar("salvar", async () => {
      const dados = { nome, quantidade, local };
      const resposta = itemCompra ? await atualizarItemCompra(itemCompra.id, dados) : await criarItemCompra(dados);
      if (entrouNaAreaSegura(resposta)) {
        aoEntrarNoApoio();
        return;
      }
      navigation.goBack();
    });
  }

  function aoMarcarComprado() {
    executar("comprado", async () => {
      await atualizarItemCompra(itemCompra.id, { comprado: !itemCompra.comprado });
      navigation.goBack();
    });
  }

  function aoRemover() {
    confirmar("Remover item?", `${itemCompra.nome} sai da sua lista.`, "Remover", () =>
      executar("remover", async () => {
        await removerItemCompra(itemCompra.id);
        navigation.goBack();
      })
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Item" placeholder="Ex.: Leite integral" value={nome} onChangeText={setNome} />
      <CampoTexto rotulo="Quantidade (opcional)" placeholder="Ex.: 2 L" value={quantidade} onChangeText={setQuantidade} />

      <Text style={estilos.rotulo}>Onde guardar (opcional)</Text>
      <View style={estilos.locais}>
        {locais.map((l) => (
          <TouchableOpacity key={l} style={[estilos.chip, local === l && estilos.chipAtivo]} onPress={() => setLocal(local === l ? "" : l)}>
            <Text style={[estilos.chipTexto, local === l && estilos.chipTextoAtivo]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <BotaoPrincipal texto={itemCompra ? "Salvar alterações" : "Adicionar à lista"} onPress={aoSalvar} carregando={acao === "salvar"} />
      {itemCompra ? (
        <BotaoPrincipal
          texto={itemCompra.comprado ? "Voltar para a lista de compras" : "Marcar como comprado"}
          tipo="secundario"
          onPress={aoMarcarComprado}
          carregando={acao === "comprado"}
        />
      ) : null}
      {itemCompra ? <BotaoPrincipal texto="Remover da lista" tipo="perigo" onPress={aoRemover} carregando={acao === "remover"} /> : null}
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
  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: 8,
  },
  locais: {
    flexDirection: "row",
    marginBottom: 18,
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
});

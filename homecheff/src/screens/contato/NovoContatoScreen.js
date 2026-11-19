import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarErro, confirmar } from "../../componentes/alertas";
import { criarContato, atualizarContato, removerContato } from "../../servicos/contatos";
import { cores } from "../../tema/tema";

export default function NovoContatoScreen({ route, navigation }) {
  const contato = route.params?.contato;
  const [nome, setNome] = useState(contato?.nome ?? "");
  const [celular, setCelular] = useState(contato?.celular ?? "");
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
    executar("salvar", () => (contato ? atualizarContato(contato.id, { nome, celular }) : criarContato({ nome, celular })));
  }

  function aoRemover() {
    confirmar("Remover contato?", `${contato.nome} sai da sua rede de apoio.`, "Remover", () =>
      executar("remover", () => removerContato(contato.id))
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Nome" placeholder="Ex.: Pessoa de confiança 03" value={nome} onChangeText={setNome} />
      <CampoTexto rotulo="Celular" placeholder="(00) 90000-0000" keyboardType="phone-pad" value={celular} onChangeText={setCelular} />
      <BotaoPrincipal texto={contato ? "Salvar alterações" : "Salvar contato"} onPress={aoSalvar} carregando={acao === "salvar"} />
      {contato ? <BotaoPrincipal texto="Remover contato" tipo="perigo" onPress={aoRemover} carregando={acao === "remover"} /> : null}
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

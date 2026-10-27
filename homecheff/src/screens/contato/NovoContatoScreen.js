import { ScrollView, StyleSheet } from "react-native";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { avisarEntrega2 } from "../../componentes/alertas";
import { cores } from "../../tema/tema";

export default function NovoContatoScreen({ route, navigation }) {
  const contato = route.params?.contato;

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <CampoTexto rotulo="Nome" placeholder="Ex.: Pessoa de confiança 03" defaultValue={contato?.nome} />
      <CampoTexto rotulo="Celular" placeholder="(00) 90000-0000" keyboardType="phone-pad" defaultValue={contato?.celular} />
      <BotaoPrincipal texto={contato ? "Salvar alterações" : "Salvar contato"} onPress={() => avisarEntrega2(navigation, "Salvar o contato")} />
      {contato ? (
        <BotaoPrincipal texto="Remover contato" tipo="perigo" onPress={() => avisarEntrega2(navigation, "Remover o contato")} />
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

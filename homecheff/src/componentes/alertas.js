import { Alert, Platform } from "react-native";
import { mensagemDeErro } from "../servicos/api";

export function avisarErro(erro, titulo = "Não foi possível salvar") {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagemDeErro(erro)}`);
    return;
  }
  Alert.alert(titulo, mensagemDeErro(erro));
}

export function confirmar(titulo, mensagem, textoConfirmar, aoConfirmar) {
  if (Platform.OS === "web") {
    if (window.confirm(`${titulo}\n\n${mensagem}`)) aoConfirmar();
    return;
  }
  Alert.alert(titulo, mensagem, [
    { text: "Cancelar", style: "cancel" },
    { text: textoConfirmar, style: "destructive", onPress: aoConfirmar },
  ]);
}

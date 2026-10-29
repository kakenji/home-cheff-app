import { Alert } from "react-native";

export function avisarEntrega2(navigation, acao) {
  Alert.alert(
    "Exemplo da Entrega 2",
    `Nesta etapa o formulário só mostra os campos. ${acao} de verdade (com estado e, depois, com a API) é o que vem nas próximas entregas.`
  );
  navigation.goBack();
}

import React from "react";
import BotaoVoltar from "../componentes/BotaoVoltar";
import { cores, fonteTitulo } from "../tema/tema";

export function opcoesStack({ navigation }) {
  return {
    headerStyle: { backgroundColor: cores.fundo },
    headerShadowVisible: false,
    headerTintColor: cores.verde,
    headerTitleStyle: { fontFamily: fonteTitulo, fontWeight: "bold", color: cores.texto },
    headerBackVisible: false,
    headerLeft: navigation.canGoBack() ? () => <BotaoVoltar onPress={navigation.goBack} /> : undefined,
    contentStyle: { backgroundColor: cores.fundo },
  };
}

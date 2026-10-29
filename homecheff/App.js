import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RaizNavegacao from "./src/navegacao/RaizNavegacao";
import { cores } from "./src/tema/tema";

const temaNavegacao = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: cores.fundo },
};

export default function App() {
  const [modoApoio, setModoApoio] = useState(false);

  return (
    <NavigationContainer theme={temaNavegacao}>
      <StatusBar style="dark" />
      <RaizNavegacao
        modoApoio={modoApoio}
        aoEntrarNoApoio={() => setModoApoio(true)}
        aoSair={() => setModoApoio(false)}
      />
    </NavigationContainer>
  );
}

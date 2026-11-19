import React, { useEffect, useState } from "react";
import { AppState, View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RaizNavegacao from "./src/navegacao/RaizNavegacao";
import { cores, sombraForte } from "./src/tema/tema";

const temaNavegacao = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: cores.fundo },
};

export default function App() {
  const [modoApoio, setModoApoio] = useState(false);

  useEffect(() => {
    const assinatura = AppState.addEventListener("change", (estado) => {
      if (estado === "background") setModoApoio(false);
    });
    return () => assinatura.remove();
  }, []);

  return (
    <View style={estilos.moldura}>
      <View style={estilos.aparelho}>
        <NavigationContainer theme={temaNavegacao}>
          <StatusBar style="dark" />
          <RaizNavegacao
            modoApoio={modoApoio}
            aoEntrarNoApoio={() => setModoApoio(true)}
            aoSair={() => setModoApoio(false)}
          />
        </NavigationContainer>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  moldura: {
    flex: 1,
    backgroundColor: Platform.OS === "web" ? cores.moldura : cores.fundo,
    alignItems: "center",
  },
  aparelho: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 480 : undefined,
    backgroundColor: cores.fundo,
    overflow: "hidden",
    ...(Platform.OS === "web" ? sombraForte : {}),
  },
});

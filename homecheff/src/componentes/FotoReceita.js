import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores } from "../tema/tema";

export default function FotoReceita({ uri, style, tamanhoIcone = 26 }) {
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    setFalhou(false);
  }, [uri]);

  return (
    <View style={[estilos.base, style]}>
      {uri && !falhou ? (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFalhou(true)}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Ionicons name="restaurant-outline" size={tamanhoIcone} color={cores.verde} />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

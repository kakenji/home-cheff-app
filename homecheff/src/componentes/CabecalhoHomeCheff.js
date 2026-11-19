import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BotaoVoltar from "./BotaoVoltar";
import { buscarUsuarioAtual, iniciais } from "../servicos/usuarios";
import { cores, fonteTitulo } from "../tema/tema";

export default function CabecalhoHomeCheff({ aoVoltar }) {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      buscarUsuarioAtual()
        .then((u) => ativo && setUsuario(u))
        .catch(() => ativo && setUsuario(null));
      return () => {
        ativo = false;
      };
    }, [])
  );

  const sigla = iniciais(usuario?.nome);

  return (
    <SafeAreaView edges={["top"]} style={estilos.seguro}>
      <View style={estilos.linha}>
        {aoVoltar ? (
          <View style={estilos.voltar}>
            <BotaoVoltar onPress={aoVoltar} />
          </View>
        ) : null}
        <View style={estilos.logo}>
          <Ionicons name="leaf-outline" size={20} color={cores.verde} />
        </View>
        <View style={estilos.textos}>
          <Text style={estilos.nome}>HomeCheff</Text>
          <Text style={estilos.slogan}>COZINHA DE TODO DIA</Text>
        </View>
        <TouchableOpacity
          style={estilos.avatar}
          onPress={() => navigation.navigate("Perfil")}
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil"
          hitSlop={8}
        >
          {sigla ? (
            <Text style={estilos.avatarTexto}>{sigla}</Text>
          ) : (
            <Ionicons name="person-outline" size={18} color={cores.verde} />
          )}
          <View style={estilos.selo}>
            <Ionicons name="person" size={9} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  seguro: {
    backgroundColor: cores.fundo,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  voltar: {
    marginLeft: -6,
    marginRight: 6,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  textos: {
    flex: 1,
    marginLeft: 12,
  },
  nome: {
    fontFamily: fonteTitulo,
    fontSize: 19,
    fontWeight: "bold",
    color: cores.texto,
  },
  slogan: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: cores.textoSuave,
    fontWeight: "600",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.verdeClaro,
    borderWidth: 2,
    borderColor: cores.cartao,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.verdeEscuro,
  },
  selo: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: cores.verde,
    borderWidth: 2,
    borderColor: cores.fundo,
    alignItems: "center",
    justifyContent: "center",
  },
});

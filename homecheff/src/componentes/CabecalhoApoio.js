import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores, fonteTitulo } from "../tema/tema";

export default function CabecalhoApoio({ aoSair }) {
  return (
    <SafeAreaView edges={["top"]} style={estilos.seguro}>
      <View style={estilos.linha}>
        <View style={estilos.logo}>
          <Ionicons name="leaf-outline" size={20} color={cores.verde} />
        </View>
        <View style={estilos.textos}>
          <Text style={estilos.nome}>HomeCheff</Text>
          <Text style={estilos.slogan}>ESPAÇO DE APOIO</Text>
        </View>
        <TouchableOpacity style={estilos.botaoVoltar} onPress={aoSair}>
          <Ionicons name="home-outline" size={16} color={cores.verde} />
          <Text style={estilos.botaoVoltarTexto}>Voltar</Text>
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
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  botaoVoltarTexto: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: cores.verde,
  },
});

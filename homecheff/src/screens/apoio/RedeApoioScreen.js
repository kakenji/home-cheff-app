import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores, fonteTitulo } from "../../tema/tema";
import { contatos } from "../../dados/mockData";

export default function RedeApoioScreen({ navigation }) {
  function aoEnviarSms(contato) {
    Alert.alert(
      "Exemplo da Entrega 2",
      `Aqui o app vai abrir o SMS para ${contato.nome} já com a sua localização atual (GPS). Isso vem nas próximas entregas.`
    );
  }

  function aoRemover(contato) {
    Alert.alert("Remover contato?", `${contato.nome} sai da sua rede de apoio.`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive" },
    ]);
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={
          <Text style={estilos.intro}>Pessoas de extrema confiança que podem ser avisadas por SMS. Todos os contatos aqui são fictícios.</Text>
        }
        ListEmptyComponent={<Text style={estilos.vazio}>Você ainda não cadastrou ninguém. Toque em “+ Novo contato”.</Text>}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <TouchableOpacity style={estilos.corpo} onPress={() => navigation.navigate("NovoContato", { contato: item })}>
              <View style={estilos.icone}><Ionicons name="person-outline" size={20} color={cores.verde} /></View>
              <View style={estilos.info}>
                <Text style={estilos.nome}>{item.nome}</Text>
                <Text style={estilos.detalhe}>{item.celular}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={() => aoEnviarSms(item)} hitSlop={8}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={cores.verde} />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={() => aoRemover(item)} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={cores.perigo} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={estilos.botaoNovo} onPress={() => navigation.navigate("NovoContato")}>
        <Text style={estilos.botaoNovoTexto}>+ Novo contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  lista: {
    padding: 20,
    paddingBottom: 90,
  },
  intro: {
    fontSize: 14,
    color: cores.textoSuave,
    lineHeight: 20,
    marginBottom: 16,
  },
  vazio: {
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.cartao,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 12,
  },
  corpo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nome: {
    fontFamily: fonteTitulo,
    fontSize: 16,
    fontWeight: "bold",
    color: cores.texto,
  },
  detalhe: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 3,
  },
  acao: {
    paddingHorizontal: 8,
  },
  botaoNovo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: cores.verde,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  botaoNovoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

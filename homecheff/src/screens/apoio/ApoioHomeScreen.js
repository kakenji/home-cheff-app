import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CabecalhoApoio from "../../componentes/CabecalhoApoio";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import { cores, fonteTitulo } from "../../tema/tema";
import { contatos, canaisOficiais, canalEmergencia } from "../../dados/mockData";

function abrirCanal(canal) {
  Alert.alert(canal.titulo, "Deseja abrir este canal agora?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Abrir", onPress: () => Linking.openURL(canal.acao) },
  ]);
}

export default function ApoioHomeScreen({ navigation, aoSair }) {
  return (
    <View style={estilos.container}>
      <CabecalhoApoio aoSair={aoSair} />
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.apoio}>UM ESPAÇO DISCRETO</Text>
        <Text style={estilos.titulo}>Você não precisa resolver tudo agora.</Text>
        <Text style={estilos.texto}>
          Este espaço reúne sua rede de apoio e um diário seguro, com canais oficiais de ajuda. Escolha apenas o que fizer sentido para você.
        </Text>

        <View style={[estilos.cartao, { backgroundColor: cores.verdeClaro }]}>
          <Text style={estilos.apoio}>REDE DE CONFIANÇA</Text>
          <Text style={estilos.cartaoTitulo}>Pessoas escolhidas por você</Text>
          <View style={estilos.contatos}>
            {contatos.slice(0, 2).map((c) => (
              <View key={c.id} style={estilos.contato}>
                <Text style={estilos.contatoNome}>{c.nome}</Text>
                <Text style={estilos.contatoDetalhe}>{c.celular}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={estilos.linkLinha} onPress={() => navigation.navigate("RedeApoio")}>
            <Text style={estilos.linkTexto}>Gerenciar rede de apoio</Text>
            <Ionicons name="chevron-forward" size={18} color={cores.verde} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[estilos.cartao, estilos.cartaoLinha, { backgroundColor: cores.bege }]} onPress={() => navigation.navigate("Diario")}>
          <View style={estilos.iconeAnotar}><Ionicons name="create-outline" size={22} color={cores.dourado} /></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={estilos.cartaoTitulo}>Anotar algo</Text>
            <Text style={estilos.contatoDetalhe}>Registro seguro das ocorrências</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={cores.textoSuave} />
        </TouchableOpacity>

        <View style={[estilos.cartao, { backgroundColor: cores.cartao }]}>
          <Text style={estilos.apoio}>CANAIS OFICIAIS</Text>
          <Text style={estilos.cartaoTitulo}>Apoio e atendimento</Text>
          {canaisOficiais.map((canal) => (
            <TouchableOpacity key={canal.id} style={estilos.canal} onPress={() => abrirCanal(canal)}>
              <View style={estilos.iconeCanal}><Ionicons name={canal.icone} size={20} color={cores.verde} /></View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={estilos.canalTitulo}>{canal.titulo}</Text>
                <Text style={estilos.contatoDetalhe}>{canal.detalhe}</Text>
              </View>
              <Ionicons name="arrow-up-outline" size={16} color={cores.textoSuave} style={{ transform: [{ rotate: "45deg" }] }} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[estilos.canal, estilos.emergencia]} onPress={() => abrirCanal(canalEmergencia)}>
            <View style={[estilos.iconeCanal, { backgroundColor: "#EFD3CC" }]}><Ionicons name="shield-outline" size={20} color={cores.perigo} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[estilos.canalTitulo, { color: cores.perigo }]}>{canalEmergencia.titulo}</Text>
              <Text style={estilos.contatoDetalhe}>{canalEmergencia.detalhe}</Text>
            </View>
            <Ionicons name="call-outline" size={20} color={cores.perigo} />
          </TouchableOpacity>
          <Text style={estilos.fonte}>Fonte: Ministério das Mulheres · Ligue 180, página oficial</Text>
        </View>

        <View style={estilos.aviso}>
          <Ionicons name="information-circle-outline" size={18} color={cores.textoSuave} />
          <Text style={estilos.avisoTexto}>
            Protótipo acadêmico com dados fictícios. Não substitui atendimento policial, jurídico, psicológico ou de saúde. Em
            emergência real, ligue 190.
          </Text>
        </View>

        <View style={[estilos.cartao, estilos.cartaoLinha, { backgroundColor: "#EDE8DE" }]}>
          <View style={{ flex: 1 }}>
            <Text style={estilos.canalTitulo}>Saída rápida</Text>
            <Text style={estilos.contatoDetalhe}>Volte à tela de cozinha a qualquer momento.</Text>
          </View>
          <View style={{ width: 110 }}>
            <BotaoPrincipal texto="Voltar" onPress={aoSair} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  apoio: {
    fontSize: 10,
    letterSpacing: 1.3,
    fontWeight: "700",
    color: cores.textoSuave,
    marginBottom: 4,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 30,
    fontWeight: "bold",
    color: cores.texto,
    lineHeight: 36,
  },
  texto: {
    fontSize: 14,
    color: cores.textoSuave,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 18,
  },
  cartao: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 14,
  },
  cartaoLinha: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartaoTitulo: {
    fontFamily: fonteTitulo,
    fontSize: 19,
    fontWeight: "bold",
    color: cores.texto,
    marginBottom: 6,
  },
  contatos: {
    flexDirection: "row",
    marginTop: 6,
  },
  contato: {
    flex: 1,
    backgroundColor: cores.cartao,
    borderRadius: 14,
    padding: 12,
    marginRight: 8,
  },
  contatoNome: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.texto,
  },
  contatoDetalhe: {
    fontSize: 11,
    color: cores.textoSuave,
    marginTop: 2,
  },
  linkLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  linkTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.verde,
  },
  iconeAnotar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EBD8BE",
    alignItems: "center",
    justifyContent: "center",
  },
  canal: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  iconeCanal: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  canalTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.texto,
  },
  emergencia: {
    backgroundColor: cores.perigoClaro,
    borderRadius: 14,
    paddingHorizontal: 10,
    marginTop: 6,
    borderTopWidth: 0,
  },
  fonte: {
    fontSize: 10,
    color: cores.textoSuave,
    marginTop: 10,
  },
  aviso: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  avisoTexto: {
    flex: 1,
    marginLeft: 8,
    fontSize: 11,
    color: cores.textoSuave,
    lineHeight: 16,
  },
});

import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoPrincipal from "../../componentes/BotaoPrincipal";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import { avisarErro } from "../../componentes/alertas";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { buscarUsuarioAtual, atualizarUsuarioAtual, iniciais } from "../../servicos/usuarios";
import { listarReceitas } from "../../servicos/receitas";
import { listarItensCompra } from "../../servicos/itensCompra";
import { cores, fonteTitulo, sombra } from "../../tema/tema";

export default function PerfilScreen({ navigation }) {
  const buscar = useCallback(async () => {
    const [usuario, receitas, itens] = await Promise.all([buscarUsuarioAtual({ forcar: true }), listarReceitas(), listarItensCompra()]);
    return { usuario, receitas: receitas.length, naDespensa: itens.filter((i) => i.comprado).length, faltam: itens.filter((i) => !i.comprado).length };
  }, []);
  const { dados, carregando, erro, recarregar } = useDadosDaApi(buscar);
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [salvando, setSalvando] = useState(false);

  if (!dados) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  const nomeAtual = nome ?? dados.usuario.nome;
  const emailAtual = email ?? dados.usuario.email;

  async function aoSalvar() {
    setSalvando(true);
    try {
      await atualizarUsuarioAtual({ nome: nomeAtual, email: emailAtual });
      navigation.goBack();
    } catch (e) {
      avisarErro(e);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <View style={[estilos.cartaoTopo, sombra]}>
        <View style={estilos.avatar}>
          <Text style={estilos.avatarTexto}>{iniciais(nomeAtual) || "?"}</Text>
        </View>
        <Text style={estilos.nome}>{nomeAtual || "Sem nome"}</Text>
        <Text style={estilos.email}>{emailAtual}</Text>

        <View style={estilos.numeros}>
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{dados.receitas}</Text>
            <Text style={estilos.numeroRotulo}>receitas</Text>
          </View>
          <View style={estilos.divisor} />
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{dados.naDespensa}</Text>
            <Text style={estilos.numeroRotulo}>na despensa</Text>
          </View>
          <View style={estilos.divisor} />
          <View style={estilos.numero}>
            <Text style={estilos.numeroValor}>{dados.faltam}</Text>
            <Text style={estilos.numeroRotulo}>para comprar</Text>
          </View>
        </View>
      </View>

      <View style={estilos.secaoTitulo}>
        <Ionicons name="create-outline" size={16} color={cores.textoSuave} />
        <Text style={estilos.secao}>Seus dados</Text>
      </View>
      <CampoTexto rotulo="Nome" placeholder="Como você quer ser chamada" value={nomeAtual} onChangeText={setNome} />
      <CampoTexto
        rotulo="Email"
        placeholder="voce@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={emailAtual}
        onChangeText={setEmail}
      />
      <BotaoPrincipal texto="Salvar perfil" onPress={aoSalvar} carregando={salvando} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 48,
  },
  cartaoTopo: {
    backgroundColor: cores.cartao,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: cores.verde,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarTexto: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  nome: {
    fontFamily: fonteTitulo,
    fontSize: 24,
    fontWeight: "bold",
    color: cores.texto,
  },
  email: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 4,
  },
  numeros: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: cores.fundo,
    borderRadius: 16,
    paddingVertical: 12,
    alignSelf: "stretch",
  },
  numero: {
    flex: 1,
    alignItems: "center",
  },
  numeroValor: {
    fontFamily: fonteTitulo,
    fontSize: 22,
    fontWeight: "bold",
    color: cores.verde,
  },
  numeroRotulo: {
    fontSize: 11,
    color: cores.textoSuave,
    marginTop: 2,
  },
  divisor: {
    width: 1,
    height: 28,
    backgroundColor: cores.borda,
  },
  secaoTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  secao: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: cores.textoSuave,
    letterSpacing: 0.5,
  },
});

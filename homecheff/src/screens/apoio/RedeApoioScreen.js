import { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import CartaoMensagemAjuda from "../../componentes/CartaoMensagemAjuda";
import { avisarErro, confirmar } from "../../componentes/alertas";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { listarContatos, removerContato } from "../../servicos/contatos";
import { buscarUsuarioAtual, atualizarUsuarioAtual } from "../../servicos/usuarios";
import { MENSAGEM_AJUDA_PADRAO } from "../../dados/mensagemAjuda";
import { cores, fonteTitulo, sombra, sombraForte } from "../../tema/tema";

export default function RedeApoioScreen({ navigation }) {
  const { dados: contatos, setDados: setContatos, carregando, erro, recarregar } = useDadosDaApi(listarContatos, []);
  const [mensagem, setMensagem] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      buscarUsuarioAtual({ forcar: true })
        .then((u) => ativo && setMensagem(u.mensagemAjuda || MENSAGEM_AJUDA_PADRAO))
        .catch(() => ativo && setMensagem(MENSAGEM_AJUDA_PADRAO));
      return () => {
        ativo = false;
      };
    }, [])
  );

  async function aoSalvarMensagem(texto) {
    try {
      const usuario = await atualizarUsuarioAtual({ mensagemAjuda: texto });
      setMensagem(usuario.mensagemAjuda || texto);
      return true;
    } catch (e) {
      avisarErro(e, "Não foi possível salvar a mensagem");
      return false;
    }
  }

  function aoEnviarSms(contato) {
    const numero = contato.celular.replace(/\D/g, "");
    const separador = Platform.OS === "ios" ? "&" : "?";
    Linking.openURL(`sms:${numero}${separador}body=${encodeURIComponent(mensagem || MENSAGEM_AJUDA_PADRAO)}`).catch((e) =>
      avisarErro(e, "Não foi possível abrir o SMS")
    );
  }

  function aoRemover(contato) {
    confirmar("Remover contato?", `${contato.nome} sai da sua rede de apoio.`, "Remover", async () => {
      try {
        await removerContato(contato.id);
        setContatos((atuais) => atuais.filter((c) => c.id !== contato.id));
      } catch (e) {
        avisarErro(e, "Não foi possível remover");
      }
    });
  }

  if (erro || (carregando && contatos.length === 0)) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        refreshing={carregando}
        onRefresh={recarregar}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <CartaoMensagemAjuda mensagem={mensagem ?? ""} carregando={mensagem === null} aoSalvar={aoSalvarMensagem} />
            <Text style={estilos.intro}>Pessoas de extrema confiança que podem ser avisadas por SMS.</Text>
          </View>
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

      <TouchableOpacity activeOpacity={0.85} style={estilos.botaoNovo} onPress={() => navigation.navigate("NovoContato")}>
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
    ...sombra,
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
    ...sombraForte,
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

import React, { useState } from "react";
import { Platform, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MENSAGEM_AJUDA_PADRAO, LIMITE_MENSAGEM_AJUDA } from "../dados/mensagemAjuda";
import { cores, fonteTitulo, sombra } from "../tema/tema";

export default function CartaoMensagemAjuda({ mensagem, carregando, aoSalvar }) {
  const [editando, setEditando] = useState(false);
  const [rascunho, setRascunho] = useState("");
  const [salvando, setSalvando] = useState(false);

  function iniciarEdicao() {
    setRascunho(mensagem);
    setEditando(true);
  }

  async function salvar() {
    setSalvando(true);
    const ok = await aoSalvar(rascunho.trim());
    setSalvando(false);
    if (ok) setEditando(false);
  }

  const vazia = rascunho.trim() === "";

  return (
    <View style={[estilos.cartao, sombra]}>
      <View style={estilos.topo}>
        <View style={estilos.icone}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color={cores.verde} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={estilos.apoio}>MENSAGEM PRONTA</Text>
          <Text style={estilos.titulo}>Pedido de ajuda</Text>
        </View>
        {!editando && !carregando ? (
          <TouchableOpacity style={estilos.botaoEditar} onPress={iniciarEdicao} accessibilityRole="button" accessibilityLabel="Editar mensagem">
            <Ionicons name="create-outline" size={16} color={cores.verde} />
            <Text style={estilos.botaoEditarTexto}>Editar</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {carregando ? (
        <ActivityIndicator color={cores.verde} style={{ marginVertical: 12 }} />
      ) : editando ? (
        <View>
          <TextInput
            style={estilos.input}
            value={rascunho}
            onChangeText={setRascunho}
            multiline
            maxLength={LIMITE_MENSAGEM_AJUDA}
            textAlignVertical="top"
            autoFocus
            placeholder="Escreva a mensagem que será enviada aos seus contatos"
            placeholderTextColor={cores.textoSuave}
          />
          <View style={estilos.linhaInfo}>
            <TouchableOpacity onPress={() => setRascunho(MENSAGEM_AJUDA_PADRAO)} hitSlop={8}>
              <Text style={estilos.link}>Usar mensagem padrão</Text>
            </TouchableOpacity>
            <Text style={estilos.contador}>{rascunho.length}/{LIMITE_MENSAGEM_AJUDA}</Text>
          </View>
          <View style={estilos.acoes}>
            <TouchableOpacity style={[estilos.botao, estilos.botaoSecundario]} onPress={() => setEditando(false)} disabled={salvando}>
              <Text style={estilos.botaoSecundarioTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[estilos.botao, estilos.botaoPrimario, (vazia || salvando) && { opacity: 0.6 }]}
              onPress={salvar}
              disabled={vazia || salvando}
            >
              {salvando ? <ActivityIndicator color="#fff" /> : <Text style={estilos.botaoPrimarioTexto}>Salvar mensagem</Text>}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={estilos.mensagem}>“{mensagem}”</Text>
          <Text style={estilos.dica}>Toque no balão ao lado de um contato para abrir o SMS já com este texto.</Text>
        </View>
      )}
    </View>
  );
}

const semContornoWeb = Platform.OS === "web" ? { outlineStyle: "none" } : {};

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.cartao,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 18,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icone: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: cores.verdeClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  apoio: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: "700",
    color: cores.textoSuave,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 17,
    fontWeight: "bold",
    color: cores.texto,
  },
  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.verdeClaro,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  botaoEditarTexto: {
    marginLeft: 4,
    color: cores.verde,
    fontWeight: "600",
    fontSize: 13,
  },
  mensagem: {
    fontSize: 15,
    lineHeight: 22,
    color: cores.texto,
    backgroundColor: cores.fundo,
    borderRadius: 14,
    padding: 12,
  },
  dica: {
    fontSize: 11,
    color: cores.textoSuave,
    marginTop: 8,
    lineHeight: 16,
  },
  input: {
    ...semContornoWeb,
    minHeight: 110,
    fontSize: 15,
    lineHeight: 22,
    color: cores.texto,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: cores.verde,
    padding: 12,
  },
  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  link: {
    color: cores.verde,
    fontWeight: "600",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  contador: {
    fontSize: 11,
    color: cores.textoSuave,
  },
  acoes: {
    flexDirection: "row",
    marginTop: 14,
  },
  botao: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  botaoSecundario: {
    backgroundColor: cores.fundo,
    borderWidth: 1,
    borderColor: cores.borda,
    marginRight: 8,
  },
  botaoSecundarioTexto: {
    color: cores.verde,
    fontWeight: "700",
  },
  botaoPrimario: {
    backgroundColor: cores.verde,
  },
  botaoPrimarioTexto: {
    color: "#fff",
    fontWeight: "700",
  },
});

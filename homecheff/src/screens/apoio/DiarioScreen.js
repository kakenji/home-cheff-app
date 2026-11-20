import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EstadoCarregamento from "../../componentes/EstadoCarregamento";
import { avisarErro, confirmar } from "../../componentes/alertas";
import useDadosDaApi from "../../hooks/useDadosDaApi";
import { listarOcorrencias, apagarOcorrencia } from "../../servicos/ocorrencias";
import { cores, fonteTitulo, sombra, sombraForte } from "../../tema/tema";

export default function DiarioScreen({ navigation }) {
  const { dados: lista, setDados: setLista, carregando, erro, recarregar } = useDadosDaApi(listarOcorrencias, []);

  function aoApagar(registro) {
    confirmar("Apagar definitivamente?", "O registro será destruído e não poderá ser recuperado.", "Apagar", async () => {
      try {
        await apagarOcorrencia(registro.id);
        setLista((atuais) => atuais.filter((o) => o.id !== registro.id));
      } catch (e) {
        avisarErro(e, "Não foi possível apagar");
      }
    });
  }

  if (erro || (carregando && lista.length === 0)) {
    return <EstadoCarregamento carregando={carregando} erro={erro} aoTentarNovamente={recarregar} />;
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        refreshing={carregando}
        onRefresh={recarregar}
        ListHeaderComponent={<Text style={estilos.intro}>Um registro só seu, do mais recente para o mais antigo.</Text>}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum registro ainda. Toque em “+ Novo registro”.</Text>}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <TouchableOpacity style={estilos.corpo} onPress={() => navigation.navigate("NovaOcorrencia", { ocorrencia: item })}>
              <Text style={estilos.titulo}>{item.data} · {item.hora}</Text>
              <Text style={estilos.descricao} numberOfLines={2}>{item.descricao}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => aoApagar(item)} hitSlop={8} style={estilos.lixeira}>
              <Ionicons name="trash-outline" size={20} color={cores.perigo} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity activeOpacity={0.85} style={estilos.botaoNovo} onPress={() => navigation.navigate("NovaOcorrencia")}>
        <Text style={estilos.botaoNovoTexto}>+ Novo registro</Text>
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
    backgroundColor: cores.bege,
    borderRadius: 18,
    borderLeftWidth: 5,
    borderLeftColor: cores.dourado,
    padding: 16,
    marginBottom: 12,
  },
  corpo: {
    flex: 1,
  },
  titulo: {
    fontFamily: fonteTitulo,
    fontSize: 16,
    fontWeight: "bold",
    color: cores.texto,
  },
  descricao: {
    fontSize: 14,
    color: cores.textoSuave,
    lineHeight: 20,
    marginTop: 6,
  },
  lixeira: {
    paddingLeft: 12,
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

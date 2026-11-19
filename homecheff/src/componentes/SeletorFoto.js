import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FotoReceita from "./FotoReceita";
import CampoTexto from "./CampoTexto";
import { galeriaFotos, CREDITO_FOTOS } from "../dados/galeriaFotos";
import { cores } from "../tema/tema";

export default function SeletorFoto({ valor, aoMudar }) {
  const daGaleria = galeriaFotos.some((f) => f.url === valor);

  return (
    <View style={estilos.bloco}>
      <Text style={estilos.rotulo}>Foto da receita (opcional)</Text>
      <FotoReceita uri={valor} style={estilos.previa} tamanhoIcone={40} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.galeria}>
        <TouchableOpacity
          style={[estilos.miniatura, estilos.semFoto, !valor && estilos.selecionada]}
          onPress={() => aoMudar("")}
          accessibilityRole="button"
          accessibilityLabel="Sem foto"
        >
          <Ionicons name="close-circle-outline" size={22} color={cores.textoSuave} />
          <Text style={estilos.semFotoTexto}>Sem foto</Text>
        </TouchableOpacity>
        {galeriaFotos.map((foto) => {
          const ativa = valor === foto.url;
          return (
            <TouchableOpacity
              key={foto.id}
              style={[estilos.miniatura, ativa && estilos.selecionada]}
              onPress={() => aoMudar(foto.url)}
              accessibilityRole="button"
              accessibilityLabel={`Foto: ${foto.rotulo}`}
            >
              <Image source={{ uri: foto.url }} style={StyleSheet.absoluteFill} resizeMode="cover" />
              <View style={estilos.legenda}>
                <Text style={estilos.legendaTexto} numberOfLines={1}>{foto.rotulo}</Text>
              </View>
              {ativa ? (
                <View style={estilos.check}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Text style={estilos.credito}>{CREDITO_FOTOS}</Text>

      <CampoTexto
        rotulo="Ou cole o link de uma imagem"
        placeholder="https://..."
        autoCapitalize="none"
        keyboardType="url"
        value={daGaleria ? "" : valor}
        onChangeText={aoMudar}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  bloco: {
    marginBottom: 4,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: 8,
  },
  previa: {
    height: 170,
    borderRadius: 18,
    marginBottom: 12,
  },
  galeria: {
    paddingBottom: 4,
  },
  miniatura: {
    width: 76,
    height: 76,
    borderRadius: 14,
    marginRight: 10,
    overflow: "hidden",
    backgroundColor: cores.verdeClaro,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selecionada: {
    borderColor: cores.verde,
  },
  semFoto: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.cartao,
    borderColor: cores.borda,
  },
  semFotoTexto: {
    fontSize: 10,
    color: cores.textoSuave,
    marginTop: 4,
    fontWeight: "600",
  },
  legenda: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(43, 47, 39, 0.55)",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  legendaTexto: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  check: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: cores.verde,
    alignItems: "center",
    justifyContent: "center",
  },
  credito: {
    fontSize: 10,
    color: cores.textoSuave,
    marginTop: 4,
    marginBottom: 14,
  },
});

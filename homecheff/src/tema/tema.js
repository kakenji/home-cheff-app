import { Platform } from "react-native";

export const cores = {
  fundo: "#F3EFE9",
  cartao: "#FFFAF4",
  borda: "#E6DFD3",
  verde: "#566B45",
  verdeClaro: "#E6EBDD",
  bege: "#F6E9D8",
  texto: "#2B2F27",
  textoSuave: "#7C8574",
  perigo: "#B5483A",
  perigoClaro: "#F5E3DE",
  dourado: "#B08A4E",
};

export const fonteTitulo = Platform.select({ ios: "Georgia", android: "serif", default: "serif" });

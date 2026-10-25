// ============================================================
// Tema visual do HomeCheff — cores e fonte tiradas do protótipo
// de telas da Entrega 1. Centralizar aqui evita repetir códigos
// de cor em cada tela.
// ============================================================
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

// Fonte com serifa para os títulos (usa as fontes do sistema, sem baixar nada).
export const fonteTitulo = Platform.select({ ios: "Georgia", android: "serif", default: "serif" });

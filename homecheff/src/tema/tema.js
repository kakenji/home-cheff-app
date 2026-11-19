import { Platform } from "react-native";

export const cores = {
  fundo: "#F3EFE9",
  cartao: "#FFFAF4",
  borda: "#E6DFD3",
  verde: "#566B45",
  verdeEscuro: "#43543A",
  verdeClaro: "#E6EBDD",
  bege: "#F6E9D8",
  texto: "#2B2F27",
  textoSuave: "#7C8574",
  perigo: "#B5483A",
  perigoClaro: "#F5E3DE",
  dourado: "#B08A4E",
  moldura: "#E4DED3",
};

export const fonteTitulo = Platform.select({ ios: "Georgia", android: "serif", default: "serif" });

export const sombra = Platform.select({
  ios: { shadowColor: "#3B3226", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 2 },
  default: { boxShadow: "0 4px 14px rgba(59, 50, 38, 0.08)" },
});

export const sombraForte = Platform.select({
  ios: { shadowColor: "#3B3226", shadowOpacity: 0.16, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
  android: { elevation: 5 },
  default: { boxShadow: "0 8px 22px rgba(59, 50, 38, 0.16)" },
});

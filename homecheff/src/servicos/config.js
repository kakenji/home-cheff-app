import { Platform } from "react-native";

const ENDERECO_PADRAO = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const API_URL = (process.env.EXPO_PUBLIC_API_URL || ENDERECO_PADRAO).replace(/\/+$/, "");

export const USUARIO_ID = process.env.EXPO_PUBLIC_USUARIO_ID || "u1";

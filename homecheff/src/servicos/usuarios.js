import { obter, requisicao } from "./api";
import { USUARIO_ID } from "./config";

let cache = null;

export function buscarUsuarioAtual({ forcar = false } = {}) {
  if (!cache || forcar) {
    cache = obter(`/usuarios/${USUARIO_ID}`).catch((erro) => {
      cache = null;
      throw erro;
    });
  }
  return cache;
}

export async function atualizarUsuarioAtual(dados) {
  const { dados: usuario } = await requisicao(`/usuarios/${USUARIO_ID}`, { metodo: "PUT", corpo: dados });
  cache = Promise.resolve(usuario);
  return usuario;
}

export function iniciais(nome = "") {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return `${primeira}${ultima}`.toUpperCase();
}

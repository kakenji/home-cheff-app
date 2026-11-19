import { obter, requisicao } from "./api";
import { USUARIO_ID } from "./config";

export function listarItensCompra() {
  return obter(`/itens-compra?usuarioId=${USUARIO_ID}`);
}

export function criarItemCompra(item) {
  return requisicao("/itens-compra", { metodo: "POST", corpo: { ...item, usuarioId: USUARIO_ID } });
}

export function atualizarItemCompra(id, item) {
  return requisicao(`/itens-compra/${id}`, { metodo: "PUT", corpo: item });
}

export async function removerItemCompra(id) {
  await requisicao(`/itens-compra/${id}`, { metodo: "DELETE" });
}

export function entrouNaAreaSegura(resposta) {
  return resposta.status === 202 && resposta.headers.get("x-area-segura") === "true";
}

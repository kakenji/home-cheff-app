import { obter, requisicao } from "./api";
import { USUARIO_ID } from "./config";

export function listarContatos() {
  return obter(`/contatos?usuarioId=${USUARIO_ID}`);
}

export async function criarContato(contato) {
  const { dados } = await requisicao("/contatos", { metodo: "POST", corpo: { ...contato, usuarioId: USUARIO_ID } });
  return dados;
}

export async function atualizarContato(id, contato) {
  const { dados } = await requisicao(`/contatos/${id}`, { metodo: "PUT", corpo: contato });
  return dados;
}

export async function removerContato(id) {
  await requisicao(`/contatos/${id}`, { metodo: "DELETE" });
}

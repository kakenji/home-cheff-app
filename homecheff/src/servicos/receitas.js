import { obter, requisicao } from "./api";
import { USUARIO_ID } from "./config";

export function listarReceitas() {
  return obter(`/receitas?usuarioId=${USUARIO_ID}`);
}

export function buscarReceita(id) {
  return obter(`/receitas/${id}`);
}

export async function criarReceita(receita) {
  const { dados } = await requisicao("/receitas", { metodo: "POST", corpo: { ...receita, usuarioId: USUARIO_ID } });
  return dados;
}

export async function atualizarReceita(id, receita) {
  const { dados } = await requisicao(`/receitas/${id}`, { metodo: "PUT", corpo: receita });
  return dados;
}

export async function excluirReceita(id) {
  await requisicao(`/receitas/${id}`, { metodo: "DELETE" });
}

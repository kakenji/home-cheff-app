import { obter, requisicao } from "./api";
import { USUARIO_ID } from "./config";

export function listarOcorrencias() {
  return obter(`/ocorrencias?usuarioId=${USUARIO_ID}`);
}

export async function criarOcorrencia(ocorrencia) {
  const { dados } = await requisicao("/ocorrencias", { metodo: "POST", corpo: { ...ocorrencia, usuarioId: USUARIO_ID } });
  return dados;
}

export async function atualizarOcorrencia(id, ocorrencia) {
  const { dados } = await requisicao(`/ocorrencias/${id}`, { metodo: "PUT", corpo: ocorrencia });
  return dados;
}

export async function apagarOcorrencia(id) {
  await requisicao(`/ocorrencias/${id}`, { metodo: "DELETE" });
}

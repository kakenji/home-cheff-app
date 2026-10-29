export const PALAVRA_GATILHO = "Pimenta 180";

function processarNome(nome) {
  if (nome.trim() === PALAVRA_GATILHO) {
    return { status: 202, headers: { "x-area-segura": "true" } };
  }
  return { status: 201, headers: {} };
}

export function criarItemCompra(nome) {
  return processarNome(nome);
}

export function atualizarItemCompra(id, nome) {
  return processarNome(nome);
}

export function entrouNaAreaSegura(resposta) {
  return resposta.status === 202 && resposta.headers["x-area-segura"] === "true";
}

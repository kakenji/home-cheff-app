// ============================================================
// SIMULAÇÃO DA API — só existe na Entrega 2.
// Na Entrega 4, estas funções viram chamadas fetch/axios à API
// real, e a regra abaixo passa a ser feita pelo back-end (middleware
// no Create e no Update de ShoppingItem):
//
//   name === "Pimenta 180"  →  NÃO salva no banco; responde
//   202 Accepted + header "x-area-segura: true".
//   Qualquer outro nome     →  salva normalmente (201 Created).
//
// O app só precisa entender a resposta: 202 + header = abrir a
// área oculta. Nenhuma mensagem aparece na tela.
// ============================================================
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

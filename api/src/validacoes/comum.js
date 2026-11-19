const { requisicaoInvalida, ErroHttp } = require("../erros");
const repositorios = require("../repositorios");

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function corpoObrigatorio(corpo) {
  if (!corpo || typeof corpo !== "object" || Array.isArray(corpo)) {
    throw requisicaoInvalida(["Envie um corpo JSON (Content-Type: application/json)."]);
  }
}

function lancarSeHouverErros(erros) {
  if (erros.length > 0) throw requisicaoInvalida(erros);
}

function garantirUsuarioExiste(usuarioId) {
  if (!usuarioId) {
    throw requisicaoInvalida(["usuarioId é obrigatório."]);
  }
  if (!repositorios.usuarios.buscarPorId(usuarioId)) {
    throw new ErroHttp(422, `Relacionamento inválido: o usuário "${usuarioId}" não existe.`);
  }
}

module.exports = { texto, corpoObrigatorio, lancarSeHouverErros, garantirUsuarioExiste };

class ErroHttp extends Error {
  constructor(status, mensagem, detalhes) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes;
  }
}

function naoEncontrado(recurso, feminino = false) {
  return new ErroHttp(404, `${recurso} não ${feminino ? "encontrada" : "encontrado"}.`);
}

function requisicaoInvalida(detalhes) {
  return new ErroHttp(400, "Dados inválidos.", detalhes);
}

function conflito(mensagem) {
  return new ErroHttp(409, mensagem);
}

module.exports = { ErroHttp, naoEncontrado, requisicaoInvalida, conflito };

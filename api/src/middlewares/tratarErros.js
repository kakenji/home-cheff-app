const { ErroHttp } = require("../erros");

function rotaNaoEncontrada(req, res) {
  res.status(404).json({ erro: `Rota ${req.method} ${req.originalUrl} não existe.` });
}

function tratarErros(erro, req, res, next) {
  if (erro instanceof ErroHttp) {
    return res.status(erro.status).json({ erro: erro.message, detalhes: erro.detalhes });
  }
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON mal formatado no corpo da requisição." });
  }
  console.error(erro);
  return res.status(500).json({ erro: "Erro interno no servidor." });
}

module.exports = { rotaNaoEncontrada, tratarErros };

const { Router } = require("express");
const { contatos: repo } = require("../repositorios");
const { naoEncontrado, conflito } = require("../erros");
const { texto, corpoObrigatorio, lancarSeHouverErros, garantirUsuarioExiste } = require("../validacoes/comum");

const rotas = Router();

function apenasDigitos(valor) {
  return texto(valor).replace(/\D/g, "");
}

function montar(corpo, atual = {}) {
  return {
    usuarioId: corpo.usuarioId !== undefined ? texto(corpo.usuarioId) : atual.usuarioId,
    nome: corpo.nome !== undefined ? texto(corpo.nome) : atual.nome,
    celular: corpo.celular !== undefined ? texto(corpo.celular) : atual.celular,
  };
}

function validar(dados, idAtual) {
  const erros = [];
  if (!dados.nome) erros.push("nome é obrigatório.");
  const digitos = apenasDigitos(dados.celular);
  if (digitos.length < 10 || digitos.length > 13) erros.push("celular deve ter DDD + número (10 a 13 dígitos).");
  lancarSeHouverErros(erros);
  garantirUsuarioExiste(dados.usuarioId);
  const repetido = repo.listar((c) => c.usuarioId === dados.usuarioId && c.id !== idAtual && apenasDigitos(c.celular) === digitos);
  if (repetido.length > 0) throw conflito("Este celular já está na sua rede de apoio.");
}

function buscar(id) {
  const contato = repo.buscarPorId(id);
  if (!contato) throw naoEncontrado("Contato");
  return contato;
}

rotas.get("/", (req, res) => {
  const { usuarioId } = req.query;
  res.json(repo.listar((c) => !usuarioId || c.usuarioId === usuarioId));
});

rotas.get("/:id", (req, res) => {
  res.json(buscar(req.params.id));
});

rotas.post("/", (req, res) => {
  corpoObrigatorio(req.body);
  const dados = montar(req.body);
  validar(dados);
  res.status(201).json(repo.criar(dados));
});

rotas.put("/:id", (req, res) => {
  corpoObrigatorio(req.body);
  const atual = buscar(req.params.id);
  const dados = montar(req.body, atual);
  validar(dados, atual.id);
  res.json(repo.atualizar(atual.id, dados));
});

rotas.delete("/:id", (req, res) => {
  const contato = buscar(req.params.id);
  repo.remover(contato.id);
  res.status(204).end();
});

module.exports = rotas;

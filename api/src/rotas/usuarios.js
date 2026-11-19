const { Router } = require("express");
const repositorios = require("../repositorios");
const { naoEncontrado, conflito } = require("../erros");
const { texto, corpoObrigatorio, lancarSeHouverErros } = require("../validacoes/comum");

const rotas = Router();
const repo = repositorios.usuarios;

const LIMITE_MENSAGEM = 500;

function validar(dados) {
  const erros = [];
  if (!dados.nome) erros.push("nome é obrigatório.");
  if (!dados.email || !/^\S+@\S+\.\S+$/.test(dados.email)) erros.push("email é obrigatório e precisa ser válido.");
  if (dados.mensagemAjuda !== undefined) {
    if (!dados.mensagemAjuda) erros.push("mensagemAjuda não pode ficar vazia.");
    if (dados.mensagemAjuda.length > LIMITE_MENSAGEM) erros.push(`mensagemAjuda pode ter no máximo ${LIMITE_MENSAGEM} caracteres.`);
  }
  lancarSeHouverErros(erros);
}

function montar(corpo, atual = {}) {
  return {
    nome: corpo.nome !== undefined ? texto(corpo.nome) : atual.nome,
    email: corpo.email !== undefined ? texto(corpo.email).toLowerCase() : atual.email,
    mensagemAjuda: corpo.mensagemAjuda !== undefined ? texto(corpo.mensagemAjuda) : atual.mensagemAjuda,
  };
}

rotas.get("/", (req, res) => {
  res.json(repo.listar());
});

rotas.get("/:id", (req, res) => {
  const usuario = repo.buscarPorId(req.params.id);
  if (!usuario) throw naoEncontrado("Usuário");
  res.json(usuario);
});

rotas.post("/", (req, res) => {
  corpoObrigatorio(req.body);
  const dados = montar(req.body);
  validar(dados);
  if (repo.listar((u) => u.email === dados.email).length > 0) throw conflito("Já existe um usuário com este email.");
  res.status(201).json(repo.criar(dados));
});

rotas.put("/:id", (req, res) => {
  corpoObrigatorio(req.body);
  const atual = repo.buscarPorId(req.params.id);
  if (!atual) throw naoEncontrado("Usuário");
  const dados = montar(req.body, atual);
  validar(dados);
  res.json(repo.atualizar(atual.id, dados));
});

rotas.delete("/:id", (req, res) => {
  const usuario = repo.buscarPorId(req.params.id);
  if (!usuario) throw naoEncontrado("Usuário");
  const dependentes = ["receitas", "itensCompra", "contatos", "ocorrencias"].filter(
    (nome) => repositorios[nome].listar((item) => item.usuarioId === usuario.id && !item.deletedAt).length > 0
  );
  if (dependentes.length > 0) {
    throw conflito(`Usuário possui registros vinculados (${dependentes.join(", ")}). Remova-os antes.`);
  }
  repo.remover(usuario.id);
  res.status(204).end();
});

module.exports = rotas;

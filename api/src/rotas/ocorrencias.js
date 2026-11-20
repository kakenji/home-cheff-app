const { Router } = require("express");
const { ocorrencias: repo } = require("../repositorios");
const { naoEncontrado } = require("../erros");
const { texto, corpoObrigatorio, lancarSeHouverErros, garantirUsuarioExiste } = require("../validacoes/comum");

const rotas = Router();

function dataValida(valor) {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor ?? "");
  if (!partes) return false;
  const [, dia, mes, ano] = partes.map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
}

function horaValida(valor) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(valor ?? "");
}

function chaveOrdenacao(o) {
  const [dia, mes, ano] = o.data.split("/");
  return `${ano}${mes}${dia}${o.hora}`;
}

function montar(corpo, atual = {}) {
  return {
    usuarioId: corpo.usuarioId !== undefined ? texto(corpo.usuarioId) : atual.usuarioId,
    data: corpo.data !== undefined ? texto(corpo.data) : atual.data,
    hora: corpo.hora !== undefined ? texto(corpo.hora) : atual.hora,
    descricao: corpo.descricao !== undefined ? texto(corpo.descricao) : atual.descricao,
  };
}

function validar(dados) {
  const erros = [];
  if (!dataValida(dados.data)) erros.push("data deve estar no formato dd/mm/aaaa e ser uma data real.");
  if (!horaValida(dados.hora)) erros.push("hora deve estar no formato hh:mm.");
  if (!dados.descricao) erros.push("descricao é obrigatória.");
  lancarSeHouverErros(erros);
  garantirUsuarioExiste(dados.usuarioId);
}

function buscar(id) {
  const ocorrencia = repo.buscarPorId(id);
  if (!ocorrencia) throw naoEncontrado("Registro");
  return ocorrencia;
}

rotas.get("/", (req, res) => {
  const { usuarioId } = req.query;
  const lista = repo.listar((o) => !usuarioId || o.usuarioId === usuarioId);
  res.json([...lista].sort((a, b) => chaveOrdenacao(b).localeCompare(chaveOrdenacao(a))));
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
  validar(dados);
  res.json(repo.atualizar(atual.id, dados));
});

rotas.delete("/:id", (req, res) => {
  const ocorrencia = buscar(req.params.id);
  repo.remover(ocorrencia.id);
  res.status(204).end();
});

module.exports = rotas;

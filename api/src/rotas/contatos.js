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

async function validar(dados, idAtual) {
  const erros = [];
  if (!dados.nome) erros.push("nome é obrigatório.");
  const digitos = apenasDigitos(dados.celular);
  if (digitos.length < 10 || digitos.length > 13) erros.push("celular deve ter DDD + número (10 a 13 dígitos).");
  lancarSeHouverErros(erros);
  await garantirUsuarioExiste(dados.usuarioId);
  const outros = await repo.listar({ usuarioId: dados.usuarioId, id: { $ne: idAtual ?? null } });
  const repetido = outros.some((c) => apenasDigitos(c.celular) === digitos);
  if (repetido) throw conflito("Este celular já está na sua rede de apoio.");
}

async function buscar(id) {
  const contato = await repo.buscarPorId(id);
  if (!contato) throw naoEncontrado("Contato");
  return contato;
}

rotas.get("/", async (req, res) => {
  const { usuarioId } = req.query;
  res.json(await repo.listar(usuarioId ? { usuarioId } : {}));
});

rotas.get("/:id", async (req, res) => {
  res.json(await buscar(req.params.id));
});

rotas.post("/", async (req, res) => {
  corpoObrigatorio(req.body);
  const dados = montar(req.body);
  await validar(dados);
  res.status(201).json(await repo.criar(dados));
});

rotas.put("/:id", async (req, res) => {
  corpoObrigatorio(req.body);
  const atual = await buscar(req.params.id);
  const dados = montar(req.body, atual);
  await validar(dados, atual.id);
  res.json(await repo.atualizar(atual.id, dados));
});

rotas.delete("/:id", async (req, res) => {
  const contato = await buscar(req.params.id);
  await repo.remover(contato.id);
  res.status(204).end();
});

module.exports = rotas;

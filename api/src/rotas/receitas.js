const { Router } = require("express");
const { receitas: repo } = require("../repositorios");
const { naoEncontrado } = require("../erros");
const { texto, corpoObrigatorio, lancarSeHouverErros, garantirUsuarioExiste } = require("../validacoes/comum");

const rotas = Router();

function listaDeTextos(valor) {
  if (typeof valor === "string") valor = valor.split("\n");
  if (!Array.isArray(valor)) return null;
  return valor.map((linha) => texto(linha)).filter((linha) => linha !== "");
}

function montar(corpo, atual = {}) {
  return {
    usuarioId: corpo.usuarioId !== undefined ? texto(corpo.usuarioId) : atual.usuarioId,
    categoria: corpo.categoria !== undefined ? texto(corpo.categoria) : atual.categoria ?? "",
    titulo: corpo.titulo !== undefined ? texto(corpo.titulo) : atual.titulo,
    descricao: corpo.descricao !== undefined ? texto(corpo.descricao) : atual.descricao ?? "",
    tempoPreparo: corpo.tempoPreparo !== undefined ? Number(corpo.tempoPreparo) : atual.tempoPreparo,
    ingredientes: corpo.ingredientes !== undefined ? listaDeTextos(corpo.ingredientes) : atual.ingredientes,
    modoPreparo: corpo.modoPreparo !== undefined ? listaDeTextos(corpo.modoPreparo) : atual.modoPreparo,
    imagemUrl: corpo.imagemUrl !== undefined ? texto(corpo.imagemUrl) : atual.imagemUrl ?? "",
  };
}

async function validar(dados) {
  const erros = [];
  if (!dados.titulo) erros.push("titulo é obrigatório.");
  if (!Number.isInteger(dados.tempoPreparo) || dados.tempoPreparo <= 0) erros.push("tempoPreparo deve ser um número inteiro maior que zero (minutos).");
  if (!dados.ingredientes || dados.ingredientes.length === 0) erros.push("informe ao menos um ingrediente.");
  if (!dados.modoPreparo || dados.modoPreparo.length === 0) erros.push("informe ao menos um passo no modo de preparo.");
  if (dados.imagemUrl && (!/^https?:\/\/\S+$/i.test(dados.imagemUrl) || dados.imagemUrl.length > 500)) {
    erros.push("imagemUrl deve ser um link http(s) válido (até 500 caracteres).");
  }
  lancarSeHouverErros(erros);
  await garantirUsuarioExiste(dados.usuarioId);
}

async function buscarAtiva(id) {
  const receita = await repo.buscarPorId(id);
  if (!receita || receita.deletedAt) throw naoEncontrado("Receita", true);
  return receita;
}

function escaparRegex(valor) {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

rotas.get("/", async (req, res) => {
  const { usuarioId, busca } = req.query;
  const termo = texto(busca);
  const consulta = { deletedAt: null };
  if (usuarioId) consulta.usuarioId = usuarioId;
  if (termo) consulta.titulo = { $regex: escaparRegex(termo), $options: "i" };
  res.json(await repo.listar(consulta));
});

rotas.get("/:id", async (req, res) => {
  res.json(await buscarAtiva(req.params.id));
});

rotas.post("/", async (req, res) => {
  corpoObrigatorio(req.body);
  const dados = montar(req.body);
  await validar(dados);
  const agora = new Date().toISOString();
  res.status(201).json(await repo.criar({ ...dados, criadoEm: agora, atualizadoEm: agora, deletedAt: null }));
});

rotas.put("/:id", async (req, res) => {
  corpoObrigatorio(req.body);
  const atual = await buscarAtiva(req.params.id);
  const dados = montar(req.body, atual);
  await validar(dados);
  res.json(await repo.atualizar(atual.id, { ...dados, atualizadoEm: new Date().toISOString() }));
});

rotas.delete("/:id", async (req, res) => {
  const receita = await buscarAtiva(req.params.id);
  await repo.atualizar(receita.id, { deletedAt: new Date().toISOString() });
  res.status(204).end();
});

module.exports = rotas;

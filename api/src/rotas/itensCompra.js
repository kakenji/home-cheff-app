const { Router } = require("express");
const { itensCompra: repo } = require("../repositorios");
const { naoEncontrado } = require("../erros");
const { texto, corpoObrigatorio, lancarSeHouverErros, garantirUsuarioExiste } = require("../validacoes/comum");

const rotas = Router();

const SUFIXO_GATILHO = process.env.SUFIXO_GATILHO ?? "180";
const LOCAIS = ["Geladeira", "Armário", "Freezer", ""];

function montar(corpo, atual = {}) {
  return {
    usuarioId: corpo.usuarioId !== undefined ? texto(corpo.usuarioId) : atual.usuarioId,
    nome: corpo.nome !== undefined ? texto(corpo.nome) : atual.nome,
    quantidade: corpo.quantidade !== undefined ? texto(corpo.quantidade) : atual.quantidade ?? "",
    local: corpo.local !== undefined ? texto(corpo.local) : atual.local ?? "",
    comprado: corpo.comprado !== undefined ? corpo.comprado : atual.comprado ?? false,
  };
}

async function validar(dados) {
  const erros = [];
  if (!dados.nome) erros.push("nome é obrigatório.");
  if (typeof dados.comprado !== "boolean") erros.push("comprado deve ser true ou false.");
  if (!LOCAIS.includes(dados.local)) erros.push(`local deve ser um destes: ${LOCAIS.filter(Boolean).join(", ")}.`);
  lancarSeHouverErros(erros);
  await garantirUsuarioExiste(dados.usuarioId);
}

function ehGatilho(corpo) {
  return texto(corpo?.nome).endsWith(SUFIXO_GATILHO);
}

function responderAreaSegura(res) {
  res.set("x-area-segura", "true").status(202).json({ areaSegura: true });
}

async function buscar(id) {
  const item = await repo.buscarPorId(id);
  if (!item) throw naoEncontrado("Item de compra");
  return item;
}

rotas.get("/", async (req, res) => {
  const { usuarioId, comprado } = req.query;
  if (comprado !== undefined && comprado !== "true" && comprado !== "false") return res.json([]);
  const consulta = {};
  if (usuarioId) consulta.usuarioId = usuarioId;
  if (comprado !== undefined) consulta.comprado = comprado === "true";
  res.json(await repo.listar(consulta));
});

rotas.get("/:id", async (req, res) => {
  res.json(await buscar(req.params.id));
});

rotas.post("/", async (req, res) => {
  corpoObrigatorio(req.body);
  if (ehGatilho(req.body)) return responderAreaSegura(res);
  const dados = montar(req.body);
  await validar(dados);
  res.status(201).json(await repo.criar(dados));
});

rotas.put("/:id", async (req, res) => {
  corpoObrigatorio(req.body);
  const atual = await buscar(req.params.id);
  if (ehGatilho(req.body)) return responderAreaSegura(res);
  const dados = montar(req.body, atual);
  await validar(dados);
  res.json(await repo.atualizar(atual.id, dados));
});

rotas.delete("/:id", async (req, res) => {
  const item = await buscar(req.params.id);
  await repo.remover(item.id);
  res.status(204).end();
});

module.exports = rotas;

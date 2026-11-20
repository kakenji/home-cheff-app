const fs = require("node:fs");
const path = require("node:path");
const { MongoClient } = require("mongodb");

const CAMINHO_SEED = path.join(__dirname, "..", "dados", "seed.json");
const COLECOES = ["usuarios", "receitas", "itensCompra", "contatos", "ocorrencias"];
const NOME_BANCO = process.env.MONGODB_DB || "homecheff";

let cliente = null;
let db = null;

function lerSeed() {
  return JSON.parse(fs.readFileSync(CAMINHO_SEED, "utf-8"));
}

async function criarColecoesFaltando() {
  const existentes = new Set((await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name));
  const seed = lerSeed();
  for (const nome of COLECOES) {
    const colecao = db.collection(nome);
    if (!existentes.has(nome)) {
      await db.createCollection(nome);
      const itens = (seed[nome] ?? []).map((item) => ({ ...item }));
      if (itens.length > 0) await colecao.insertMany(itens);
    }
    await colecao.createIndex({ id: 1 }, { unique: true });
  }
}

async function iniciar() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI não definida. Crie o arquivo api/.env (veja api/.env.example).");
  }
  cliente = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  await cliente.connect();
  db = cliente.db(NOME_BANCO);
  await criarColecoesFaltando();
  return db;
}

function colecao(nome) {
  if (!COLECOES.includes(nome)) throw new Error(`Coleção desconhecida: ${nome}`);
  if (!db) throw new Error("Banco ainda não foi iniciado. Chame banco.iniciar() antes.");
  return db.collection(nome);
}

async function resetar() {
  await iniciar();
  for (const nome of COLECOES) {
    await db.collection(nome).drop().catch(() => {});
  }
  await criarColecoesFaltando();
}

async function encerrar() {
  if (cliente) await cliente.close();
  cliente = null;
  db = null;
}

function descricao() {
  return `MongoDB, banco "${NOME_BANCO}"`;
}

module.exports = { iniciar, colecao, resetar, encerrar, descricao };

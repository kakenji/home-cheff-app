const fs = require("node:fs");
const path = require("node:path");

const CAMINHO_BANCO = path.join(__dirname, "..", "dados", "banco.json");
const CAMINHO_SEED = path.join(__dirname, "..", "dados", "seed.json");

let dados = null;

function completarCamposNovos() {
  const seed = JSON.parse(fs.readFileSync(CAMINHO_SEED, "utf-8"));
  let mudou = false;
  for (const [nome, itensSeed] of Object.entries(seed)) {
    for (const itemSeed of itensSeed) {
      const item = (dados[nome] ?? []).find((i) => i.id === itemSeed.id);
      if (!item) continue;
      for (const [campo, valor] of Object.entries(itemSeed)) {
        if (!(campo in item)) {
          item[campo] = valor;
          mudou = true;
        }
      }
    }
  }
  if (mudou) salvar();
}

function carregar() {
  if (!fs.existsSync(CAMINHO_BANCO)) {
    fs.copyFileSync(CAMINHO_SEED, CAMINHO_BANCO);
  }
  dados = JSON.parse(fs.readFileSync(CAMINHO_BANCO, "utf-8"));
  completarCamposNovos();
  return dados;
}

function colecao(nome) {
  if (!dados) carregar();
  if (!dados[nome]) dados[nome] = [];
  return dados[nome];
}

function salvar() {
  const temporario = `${CAMINHO_BANCO}.tmp`;
  fs.writeFileSync(temporario, JSON.stringify(dados, null, 2));
  fs.renameSync(temporario, CAMINHO_BANCO);
}

function resetar() {
  fs.copyFileSync(CAMINHO_SEED, CAMINHO_BANCO);
  return carregar();
}

module.exports = { carregar, colecao, salvar, resetar, CAMINHO_BANCO };

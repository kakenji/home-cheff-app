const crypto = require("node:crypto");
const banco = require("../banco");

class Repositorio {
  constructor(nomeColecao, prefixoId) {
    this.nomeColecao = nomeColecao;
    this.prefixoId = prefixoId;
  }

  get itens() {
    return banco.colecao(this.nomeColecao);
  }

  listar(filtro = () => true) {
    return this.itens.filter(filtro);
  }

  buscarPorId(id) {
    return this.itens.find((item) => item.id === id) ?? null;
  }

  criar(dados) {
    const novo = { id: `${this.prefixoId}${crypto.randomUUID().slice(0, 8)}`, ...dados };
    this.itens.push(novo);
    banco.salvar();
    return novo;
  }

  atualizar(id, dados) {
    const item = this.buscarPorId(id);
    if (!item) return null;
    Object.assign(item, dados, { id });
    banco.salvar();
    return item;
  }

  remover(id) {
    const indice = this.itens.findIndex((item) => item.id === id);
    if (indice === -1) return false;
    this.itens.splice(indice, 1);
    banco.salvar();
    return true;
  }
}

module.exports = Repositorio;

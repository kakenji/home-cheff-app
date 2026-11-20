const crypto = require("node:crypto");
const banco = require("../banco");

const SEM_ID_MONGO = { projection: { _id: 0 } };

class Repositorio {
  constructor(nomeColecao, prefixoId) {
    this.nomeColecao = nomeColecao;
    this.prefixoId = prefixoId;
  }

  get colecao() {
    return banco.colecao(this.nomeColecao);
  }

  async listar(consulta = {}) {
    return this.colecao.find(consulta, SEM_ID_MONGO).sort({ _id: 1 }).toArray();
  }

  async existe(consulta) {
    return (await this.colecao.countDocuments(consulta, { limit: 1 })) > 0;
  }

  async buscarPorId(id) {
    return this.colecao.findOne({ id }, SEM_ID_MONGO);
  }

  async criar(dados) {
    const novo = { id: `${this.prefixoId}${crypto.randomUUID().slice(0, 8)}`, ...dados };
    await this.colecao.insertOne({ ...novo });
    return novo;
  }

  async atualizar(id, dados) {
    return this.colecao.findOneAndUpdate(
      { id },
      { $set: { ...dados, id } },
      { ...SEM_ID_MONGO, returnDocument: "after" }
    );
  }

  async remover(id) {
    const { deletedCount } = await this.colecao.deleteOne({ id });
    return deletedCount > 0;
  }
}

module.exports = Repositorio;

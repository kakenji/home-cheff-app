const Repositorio = require("./Repositorio");

module.exports = {
  usuarios: new Repositorio("usuarios", "u"),
  receitas: new Repositorio("receitas", "r"),
  itensCompra: new Repositorio("itensCompra", "c"),
  contatos: new Repositorio("contatos", "ct"),
  ocorrencias: new Repositorio("ocorrencias", "o"),
};

const express = require("express");
const cors = require("cors");
const { rotaNaoEncontrada, tratarErros } = require("./middlewares/tratarErros");

const app = express();

app.use(cors({ exposedHeaders: ["x-area-segura"] }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nome: "HomeCheff API",
    status: "ok",
    recursos: ["/usuarios", "/receitas", "/itens-compra", "/contatos", "/ocorrencias"],
  });
});

app.use("/usuarios", require("./rotas/usuarios"));
app.use("/receitas", require("./rotas/receitas"));
app.use("/itens-compra", require("./rotas/itensCompra"));
app.use("/contatos", require("./rotas/contatos"));
app.use("/ocorrencias", require("./rotas/ocorrencias"));

app.use(rotaNaoEncontrada);
app.use(tratarErros);

module.exports = app;

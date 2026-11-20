const banco = require("./banco");

banco
  .resetar()
  .then(() => console.log(`Banco restaurado a partir do seed: ${banco.descricao()}`))
  .catch((erro) => {
    console.error("Não foi possível resetar o banco:", erro.message);
    process.exitCode = 1;
  })
  .finally(() => banco.encerrar());

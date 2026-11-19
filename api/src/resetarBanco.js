const { resetar, CAMINHO_BANCO } = require("./banco");

resetar();
console.log(`Banco restaurado a partir do seed: ${CAMINHO_BANCO}`);

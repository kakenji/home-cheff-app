const os = require("node:os");
const app = require("./app");
const banco = require("./banco");

const PORTA = Number(process.env.PORT) || 3000;

function enderecosNaRede() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((rede) => rede && rede.family === "IPv4" && !rede.internal)
    .map((rede) => `http://${rede.address}:${PORTA}`);
}

banco
  .iniciar()
  .then(() => {
    console.log(`Banco: ${banco.descricao()}`);
    app.listen(PORTA, () => {
      console.log(`HomeCheff API rodando em http://localhost:${PORTA}`);
      for (const endereco of enderecosNaRede()) {
        console.log(`Na rede local (use no celular): ${endereco}`);
      }
    });
  })
  .catch((erro) => {
    console.error("Não foi possível conectar ao banco de dados:", erro.message);
    if (/SSL alert number 80|ServerSelection|ECONNREFUSED|ETIMEDOUT/.test(`${erro.name} ${erro.message}`)) {
      console.error(
        "Dica: no MongoDB Atlas, abra Security > Network Access e libere o IP desta máquina (ou 0.0.0.0/0 para testes)."
      );
    }
    process.exit(1);
  });

const os = require("node:os");
const app = require("./app");
const banco = require("./banco");

const PORTA = Number(process.env.PORT) || 3000;

banco.carregar();

function enderecosNaRede() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((rede) => rede && rede.family === "IPv4" && !rede.internal)
    .map((rede) => `http://${rede.address}:${PORTA}`);
}

app.listen(PORTA, () => {
  console.log(`HomeCheff API rodando em http://localhost:${PORTA}`);
  for (const endereco of enderecosNaRede()) {
    console.log(`Na rede local (use no celular): ${endereco}`);
  }
});

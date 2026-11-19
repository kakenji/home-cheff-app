import { API_URL } from "./config";

const TEMPO_LIMITE_MS = 10000;

export class ErroApi extends Error {
  constructor(mensagem, status, detalhes) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes;
  }
}

export function mensagemDeErro(erro) {
  if (erro instanceof ErroApi && erro.detalhes?.length) {
    return `${erro.message}\n\n• ${erro.detalhes.join("\n• ")}`;
  }
  return erro?.message ?? "Algo deu errado. Tente novamente.";
}

export async function requisicao(caminho, { metodo = "GET", corpo } = {}) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TEMPO_LIMITE_MS);

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers: corpo !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
      signal: controlador.signal,
    });
  } catch (erro) {
    throw new ErroApi(`Não foi possível conectar à API (${API_URL}). Verifique se ela está rodando.`, 0);
  } finally {
    clearTimeout(temporizador);
  }

  const texto = await resposta.text();
  const dados = texto ? JSON.parse(texto) : null;

  if (!resposta.ok) {
    throw new ErroApi(dados?.erro ?? `Erro ${resposta.status} na API.`, resposta.status, dados?.detalhes);
  }

  return { status: resposta.status, headers: resposta.headers, dados };
}

export async function obter(caminho) {
  const { dados } = await requisicao(caminho);
  return dados;
}

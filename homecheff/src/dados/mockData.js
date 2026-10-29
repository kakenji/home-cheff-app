export const usuario = { id: "u1", nome: "Marina", email: "marina.teste@exemplo.com" };

export const receitas = [
  {
    id: "r1",
    categoria: "Jantar sem complicação",
    titulo: "Orzo cremoso de limão",
    descricao: "Uma panela só, um toque de limão e aquele conforto de comida feita em casa.",
    tempoPreparo: 20,
    ingredientes: [
      "1 xícara de orzo",
      "1 limão-siciliano (suco e raspas)",
      "10 tomates-cereja",
      "1 punhado de espinafre",
      "3 colheres (sopa) de parmesão ralado",
    ],
    modoPreparo: [
      "Refogue o orzo no azeite por 2 minutos.",
      "Cubra com água quente e cozinhe mexendo até ficar cremoso.",
      "Junte o espinafre, o tomate-cereja e o suco de limão.",
      "Finalize com parmesão e sirva em seguida.",
    ],
    deletedAt: null,
  },
  {
    id: "r2",
    categoria: "Café da manhã",
    titulo: "Omelete de espinafre",
    descricao: "Rápida, leve e boa para qualquer hora do dia.",
    tempoPreparo: 10,
    ingredientes: ["3 ovos", "1 punhado de espinafre", "2 colheres (sopa) de parmesão"],
    modoPreparo: ["Bata os ovos.", "Refogue o espinafre.", "Misture, cozinhe e finalize com parmesão."],
    deletedAt: null,
  },
  {
    id: "r3",
    categoria: "Almoço de domingo",
    titulo: "Curry de grão-de-bico",
    descricao: "Cremoso, perfumado e rende para a semana toda.",
    tempoPreparo: 35,
    ingredientes: ["1 lata de grão-de-bico", "10 tomates-cereja", "200 ml de leite de coco"],
    modoPreparo: ["Refogue o tomate.", "Junte o grão-de-bico e o leite de coco.", "Cozinhe em fogo baixo por 20 minutos."],
    deletedAt: null,
  },
  { id: "r4", categoria: "", titulo: "Receita removida", descricao: "", tempoPreparo: 0, ingredientes: [], modoPreparo: [], deletedAt: "2026-10-20" },
];

export function receitasAtivas() {
  return receitas.filter((r) => r.deletedAt === null);
}
export function buscarReceita(receitaId) {
  return receitas.find((r) => r.id === receitaId);
}

export const itensCompra = [
  { id: "c1", usuarioId: "u1", nome: "Leite integral", quantidade: "2 L", comprado: false },
  { id: "c2", usuarioId: "u1", nome: "Ovos caipiras", quantidade: "1 dúzia", comprado: false },
  { id: "c3", usuarioId: "u1", nome: "Azeite extra virgem", quantidade: "1 garrafa", comprado: false },
  { id: "c4", usuarioId: "u1", nome: "Manjericão fresco", quantidade: "1 maço", comprado: false },
  { id: "c5", usuarioId: "u1", nome: "Pão de forma", quantidade: "1 pacote", comprado: true },
];

export const despensa = [
  { id: "d1", nome: "Tomate-cereja", quantidade: "8 un", local: "Geladeira", nota: "fresquinho" },
  { id: "d2", nome: "Leite integral", quantidade: "1 L", local: "Geladeira", nota: "vence em 4 dias" },
  { id: "d3", nome: "Ovos caipiras", quantidade: "6 un", local: "Geladeira", nota: "na porta" },
  { id: "d4", nome: "Grão-de-bico", quantidade: "1 pcte", local: "Armário", nota: "pacote fechado" },
];

export const contatos = [
  { id: "ct1", usuarioId: "u1", nome: "Pessoa de confiança 01", celular: "(00) 90000-0001" },
  { id: "ct2", usuarioId: "u1", nome: "Pessoa de confiança 02", celular: "(00) 90000-0002" },
];

export const ocorrencias = [
  { id: "o1", usuarioId: "u1", data: "20/10/2026", hora: "21:40", descricao: "Anotação de exemplo para demonstrar o diário. Texto fictício." },
  { id: "o2", usuarioId: "u1", data: "22/10/2026", hora: "08:15", descricao: "Segunda anotação de exemplo, também fictícia, para preencher a lista." },
];

export const canaisOficiais = [
  { id: "ca1", titulo: "Ligue 180", detalhe: "Gratuito · todos os dias, 24 horas", acao: "tel:180", icone: "call-outline" },
  { id: "ca2", titulo: "WhatsApp do Ligue 180", detalhe: "(61) 9610-0180", acao: "https://wa.me/556196100180", icone: "chatbubble-outline" },
];
export const canalEmergencia = { titulo: "Emergência imediata: 190", detalhe: "Polícia Militar", acao: "tel:190" };

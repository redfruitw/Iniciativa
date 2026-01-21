/* =========================
   DADOS PADRÃO (ANTI-TELA VAZIA)
   ========================= */

const jogadoresPadrao = [
  { nome: "Jogador 1", rolagem: 0, img: "portraits/p1.png" },
  { nome: "Jogador 2", rolagem: 0, img: "portraits/p2.png" },
  { nome: "Jogador 3", rolagem: 0, img: "portraits/p3.png" },
  { nome: "Jogador 4", rolagem: 0, img: "portraits/p4.png" }
];

/* =========================
   SALVAR ORDEM (CONTROLE)
   ========================= */

function salvar() {
  let jogadores = [];

  for (let i = 0; i < 4; i++) {
    jogadores.push({
      nome: document.getElementById("n" + i).value,
      rolagem: Number(document.getElementById("r" + i).value),
      img: document.getElementById("i" + i).value
    });
  }

  jogadores.sort((a, b) => b.rolagem - a.rolagem);

  localStorage.setItem("jogadores", JSON.stringify(jogadores));
  localStorage.setItem("turno", "0");
}

/* =========================
   PRÓXIMO TURNO
   ========================= */

function proximo() {
  let turno = Number(localStorage.getItem("turno") || 0);
  turno = (turno + 1) % 4;
  localStorage.setItem("turno", turno.toString());
}

/* =========================
   RENDER (VISUALIZADOR)
   ========================= */

function render() {
  const coluna = document.getElementById("coluna");
  if (!coluna) return;

  // 🔑 Se não houver dados, usa os jogadores padrão
  const jogadores =
    JSON.parse(localStorage.getItem("jogadores")) || jogadoresPadrao;

  const turno = Number(localStorage.getItem("turno") || 0);

  coluna.innerHTML = "";

  jogadores.forEach((j, i) => {
    const div = document.createElement("div");
    div.className = "portrait" + (i === turno ? " ativo" : "");

    const img = document.createElement("img");
    img.src = j.img;

    div.appendChild(img);
    coluna.appendChild(div);
  });
}

/* =========================
   LOOP DE ATUALIZAÇÃO
   ========================= */

setInterval(render, 100);

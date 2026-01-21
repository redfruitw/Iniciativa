const TOTAL = 4;
let ordem = [];
let turnoAtual = 0;

/* =========================
   SALVAR / ORDENAR INICIATIVA
   ========================= */
function salvar() {
  ordem = [];

  for (let i = 0; i < TOTAL; i++) {
    ordem.push({
      nome: document.getElementById(`n${i}`).value,
      roll: parseInt(document.getElementById(`r${i}`).value) || 0,
      img: document.getElementById(`i${i}`).value
    });
  }

  // ordena do maior para o menor
  ordem.sort((a, b) => b.roll - a.roll);

  turnoAtual = 0;

  // envia para o visualizador
  window.postMessage(
    {
      type: "INIT",
      ordem,
      turnoAtual
    },
    "*"
  );
}

/* =========================
   PRÓXIMO TURNO
   ========================= */
function proximo() {
  if (ordem.length === 0) return;

  turnoAtual = (turnoAtual + 1) % ordem.length;

  window.postMessage(
    {
      type: "NEXT",
      turnoAtual
    },
    "*"
  );
}

/* =========================
   VISUALIZADOR
   ========================= */
if (document.body.classList.contains("obs")) {
  window.addEventListener("message", (event) => {
    if (!event.data) return;

    if (event.data.type === "INIT") {
      criarColuna(event.data.ordem);
      ativar(event.data.turnoAtual);
    }

    if (event.data.type === "NEXT") {
      ativar(event.data.turnoAtual);
    }
  });
}

/* =========================
   CRIA OS PORTRAITS
   ========================= */
function criarColuna(ordem) {
  const coluna = document.getElementById("coluna");
  coluna.innerHTML = "";

  ordem.forEach((p) => {
    const div = document.createElement("div");
    div.className = "portrait";

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.nome;

    div.appendChild(img);
    coluna.appendChild(div);
  });
}

/* =========================
   ATIVA COM TRANSIÇÃO (OBS FIX)
   ========================= */
function ativar(index) {
  const portraits = document.querySelectorAll(".portrait");

  portraits.forEach((p) => p.classList.remove("ativo"));

  // FORÇA O OBS A RENDERIZAR O ESTADO BASE
  if (portraits[index]) {
    void portraits[index].offsetWidth;

    setTimeout(() => {
      portraits[index].classList.add("ativo");
    }, 50); // delay essencial para o OBS
  }
}

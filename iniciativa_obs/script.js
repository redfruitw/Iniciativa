const TOTAL = 4;
let ordem = [];
let turnoAtual = 0;

/* =========================
   CANAL SEGURO (OBS SAFE)
   ========================= */
let canal = null;

if ("BroadcastChannel" in window) {
  canal = new BroadcastChannel("iniciativa_rpg");
}

/* =========================
   CONTROLE
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

  ordem.sort((a, b) => b.roll - a.roll);
  turnoAtual = 0;

  canal?.postMessage({ type: "INIT", ordem, turnoAtual });
}

function proximo() {
  if (!ordem.length) return;
  turnoAtual = (turnoAtual + 1) % ordem.length;
  canal?.postMessage({ type: "TURN", turnoAtual });
}

function voltar() {
  if (!ordem.length) return;
  turnoAtual = (turnoAtual - 1 + ordem.length) % ordem.length;
  canal?.postMessage({ type: "TURN", turnoAtual });
}

/* =========================
   VISUALIZADOR
   ========================= */
if (document.body.classList.contains("obs") && canal) {
  canal.onmessage = (e) => {
    if (e.data.type === "INIT") {
      criarColuna(e.data.ordem);
      ativar(e.data.turnoAtual);
    }

    if (e.data.type === "TURN") {
      ativar(e.data.turnoAtual);
    }
  };
}

/* =========================
   RENDER
   ========================= */
function criarColuna(ordem) {
  const coluna = document.getElementById("coluna");
  coluna.innerHTML = "";

  ordem.forEach(p => {
    const div = document.createElement("div");
    div.className = "portrait";

    const img = document.createElement("img");
    img.src = p.img;

    div.appendChild(img);
    coluna.appendChild(div);
  });
}

/* =========================
   ANIMAÇÃO OBS SAFE
   ========================= */
function ativar(index) {
  const portraits = document.querySelectorAll(".portrait");
  portraits.forEach(p => p.classList.remove("ativo"));

  if (!portraits[index]) return;

  void portraits[index].offsetWidth;

  setTimeout(() => {
    portraits[index].classList.add("ativo");
  }, 60);
}

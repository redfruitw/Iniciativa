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

function proximo() {
  let turno = Number(localStorage.getItem("turno") || 0);
  turno = (turno + 1) % 4;
  localStorage.setItem("turno", turno.toString());
}

function render() {
  const coluna = document.getElementById("coluna");
  if (!coluna) return;

  const jogadores = JSON.parse(localStorage.getItem("jogadores"));
  if (!jogadores) return;

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

setInterval(render, 100);

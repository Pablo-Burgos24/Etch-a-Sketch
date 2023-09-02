const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const paint = document.getElementById("paint");
const aside = document.getElementById("aside");
let colorPiker = document.getElementById("colorPiker");
let rainbow = document.getElementById("rainbow");
let escala = document.querySelector(`input[type="range"]`);
let grid = document.querySelector(".grid");
let square = document.createElement("div");
let colorDefecto = "#333333";
let valorEscala = document.querySelector(".valorEscala");
let currentMode = "";

colorPiker.addEventListener("input", () => {
  colorDefecto = colorPiker.value;
});

let mouseDown = false;
grid.onmousedown = () => (mouseDown = true);
grid.onmouseup = () => (mouseDown = false);
grid.ontouchstart = () => (mouseDown = true);
grid.ontouchend = () => (mouseDown = false);

escala.onclick = (e) => tamaño(e.target.value);
escala.oninput = () => {
  valorEscala.textContent = `${escala.value} x ${escala.value}`;
};

rainbow.onclick = () => (currentMode = "rainbow");

/* rainbow.onclick = () => (colorDefecto = `hsl(${Math.random() * 360}, 100%, 50%)`); */

function tamaño(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.innerHTML = "";
  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    square = document.createElement("div");
    square.classList.add("grid-element");
    square.addEventListener("mouseover", colorSquare);
    square.style.backgroundColor = "white";
    grid.insertAdjacentElement("beforeend", square);
  }
}

function colorSquare(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  this.style.backgroundColor = colorDefecto;
  eraser.addEventListener("click", () => {
    colorDefecto = "white";
    currentMode = "";
  });
  clear.addEventListener("click", () => {
    this.style.backgroundColor = "white";
  });
  paint.addEventListener("click", () => {
    colorDefecto = colorPiker.value;
    currentMode = "";
  });
  if (currentMode === "rainbow") {
    this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
}

tamaño(16);

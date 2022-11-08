let gridSize = 24;
let penColor = "#000";
//used to set the eraser back to pen color
let selectedColor = "#000";
let bgColor = "#fff";
const canvas = document.querySelector(".canvas");
let defaultBg = "#fff";

//create grid
const createGrid = (gridSize) => {
  canvas.innerHTML = "";
  let container = document.createElement("div");
  container.id = "mainGrid";
  container.className = "container";
  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = "row" + i;

    for (let j = 0; j < gridSize; j++) {
      let box = document.createElement("div");
      box.className = "box";
      box.id = `box-${i}` + 0 + j;

      row.appendChild(box);
    }

    container.appendChild(row);
  }
  canvas.appendChild(container);
};
createGrid(gridSize);
// drawing
isDrawing = false;
document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("box")) {
    isDrawing = true;
  }
});

document.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("box")) {
    e.target.style.backgroundColor = penColor;
    console.log(e.target);
  }
});

document.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    isDrawing = false;
  }
});
//set grid  borders on/off
isGridOn = true;
document.querySelector("#grid-btn").addEventListener("click", () => {
  console.log("click");
  if (isGridOn) {
    document.querySelectorAll(".box").forEach((e) => (e.style.border = "none"));
    isGridOn = false;
  } else {
    document
      .querySelectorAll(".box")
      .forEach((e) => (e.style.border = "1px solid black"));
    isGridOn = true;
  }
});

//clear the canvas
document.querySelector("#clear-grid").addEventListener("click", () => {
  document
    .querySelectorAll(".box")
    .forEach((e) => (e.style.backgroundColor = defaultBg));
  canvas.style.backgroundColor = "#fff";
});

//get grid size
const rangeSlider = document.querySelector("#range-slider");
rangeSlider.addEventListener("change", () => {
  const gridValue = rangeSlider.value;
  document
    .querySelectorAll(".range-value")
    .forEach((e) => (e.innerHTML = gridValue.toString()));
  createGrid(gridValue);
});

//manipulating pen color and canvas background
const penInputColor = document.querySelector("#pen-color-picker");
const bgInputColor = document.querySelector("#bg-color-picker");

document.querySelector("#pen__btn").addEventListener("click", () => {
  penInputColor.style.display = "block";
  penInputColor.addEventListener("change", () => {
    colorValue = penInputColor.value;
    penColor = colorValue.toString();
    selectedColor = colorValue.toString();
    penInputColor.style.display = "none";
  });
});

document.querySelector("#bg__btn").addEventListener("change", () => {
  bgInputColor.style.display = "block";
  bgInputColor.addEventListener("change", () => {
    colorValue = bgInputColor.value;
    bgColor = colorValue.toString();
    canvas.style.backgroundColor = bgColor;
    bgInputColor.style.display = "none";
  });
});

//eraser button set pen color = background color
const eraserBtn = document.querySelector("#eraser__btn");
eraserBtn.addEventListener("click", () => {
  if (!eraserBtn.classList.contains("btn-selected")) {
    penColor = bgColor;
    eraserBtn.classList.toggle("btn-selected");
  } else {
    penColor = selectedColor;
    eraserBtn.classList.toggle("btn-selected");
  }
});

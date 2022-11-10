let gridSize = 24;
let penColor = "#000000";
//used to set the eraser back to pen color
let selectedColor = "#000000";
let bgColor = "#ffffff";
const canvas = document.querySelector(".canvas");
let defaultBg = "#ffffff";
const rainbowColors = [
  "#ff0000",
  "#ffa500",
  "#ffff00",
  "#008000",
  "#0000ff",
  "#4b0082",
  "#ee82ee",
];
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
    canvas.style.cursor = "crosshair";
    isDrawing = true;
  }
});

document.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("box")) {
    if (rainbowBtn.classList.contains("btn-selected")) {
      e.target.style.backgroundColor = rainbowColors[0];
      let usedColor = rainbowColors.shift();
      rainbowColors.push(usedColor);
    } else if (lightenBtn.classList.contains("btn-selected")) {
      if (e.target.style.backgroundColor != null) {
        let hexColor = rgb2hex(e.target.style.backgroundColor);
        let newHexcolor = newShade(hexColor, 30);
        e.target.style.backgroundColor = newHexcolor.toString();
      }
    } else if (shadingBtn.classList.contains("btn-selected")) {
      if (e.target.style.backgroundColor != null) {
        let hexColor = rgb2hex(e.target.style.backgroundColor);
        let newHexcolor = newShade(hexColor, -30);
        e.target.style.backgroundColor = newHexcolor.toString();
      }
    } else {
      e.target.style.backgroundColor = penColor;
    }
  }
});

document.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    isDrawing = false;
    canvas.style.cursor = "default";
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

document.querySelector("#bg__btn").addEventListener("click", () => {
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
  disableBtns();
  eraserBtn.classList.remove("disabled");
  // lightenBtn.classList.toggle("btn-selected");
  if (!eraserBtn.classList.contains("btn-selected")) {
    penColor = bgColor;
    eraserBtn.classList.toggle("btn-selected");
  } else {
    penColor = selectedColor;
    eraserBtn.classList.toggle("btn-selected");
  }
});

//set up rainbow feature
rainbowBtn = document.querySelector("#rainbow__btn");
rainbowBtn.addEventListener("click", () => {
  disableBtns();
  rainbowBtn.classList.remove("disabled");
  rainbowBtn.classList.toggle("btn-selected");
});

//shading
const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};
const lightenBtn = document.querySelector("#lighten__btn");
lightenBtn.addEventListener("click", () => {
  disableBtns();
  lightenBtn.classList.remove("disabled");
  lightenBtn.classList.toggle("btn-selected");
});
const shadingBtn = document.querySelector("#shading__btn");
shadingBtn.addEventListener("click", () => {
  disableBtns();
  shadingBtn.classList.remove("disabled");
  shadingBtn.classList.toggle("btn-selected");
});
const disableBtns = () => {
  document
    .querySelectorAll("button")
    .forEach((e) => e.classList.toggle("disabled"));
};
// const e = () => {
//   document
//     .querySelectorAll("button")
//     .forEach((e) => e.classList.add("disabled"));
// };

function wholeRand(end, start = 0) {
  return Math.round(Math.random() * (end - start) + start);
}
function createRandomGoblin(insertAt, i) {
  let child = document.createElement("div");
  // Background
  let bkRgb1 = `rgb(
      ${wholeRand(200, 100)},
      ${wholeRand(200, 100)},
      ${wholeRand(200, 100)})`;
  let bkRgb2 = `rgb(
      ${wholeRand(100)},
      ${wholeRand(100)},
      ${wholeRand(100)})`;
  let bkg = `linear-gradient(to top, ${bkRgb1},${bkRgb2})`;

  // Main head/face
  let faceRed = wholeRand(255, 70);
  let faceYell = wholeRand(255, faceRed / 2);
  let faceRgb = `rgb(
      ${faceRed},
      ${faceYell},
      ${Math.max(wholeRand(200), 320 - faceYell - faceRed)})`;
  let head = `radial-gradient(ellipse at center, ${faceRgb} 0% 65%, rgba(0, 0, 0, 0) 0% 100%)`;
  let headDimX = wholeRand(100, 60);
  let headDimY = wholeRand(100, 60);

  // Eyes
  let eyeYell = wholeRand(252, 222);
  let eyeRgb = `rgb(
      ${wholeRand(255, 240)},
      ${eyeYell},
      ${wholeRand(255, 180)})`;
  let pupilRgb = wholeRand(40);
  let pupilDim = wholeRand(65, 15);
  let shape = wholeRand(2) < 2 ? "circle" : "ellipse";
  let eye = `radial-gradient(
      ${shape} at center, 
      rgb(${pupilRgb},${pupilRgb},${pupilRgb}) 0% ${pupilDim}%, 
      ${eyeRgb} 0% 65%, rgba(0, 0, 0, 0) 0% 100%)`;
  let eyeDimY = wholeRand(30, 5);
  let eyeDimX = wholeRand(25, eyeDimY);
  let eyeDist = Math.floor(headDimX / 2 + headDimX / 4);

  // Ears
  let ear = `radial-gradient(ellipse at center, ${faceRgb} 0% 65%, rgba(0, 0, 0, 0) 0% 100%)`;
  let earDimX = Math.max(30, Math.floor(headDimX * 0.5));
  let earDimY = Math.floor(headDimY * 0.3);

  // Mouth
  let smile = wholeRand(85);
  let teeth = smile > 60 ? wholeRand(65, 55) : 80;

  // Nose
  let classes = ["face"];
  classes.push(wholeRand(5) === 3 ? "clown" : "goblin");

  //Body
  let body = `radial-gradient(ellipse at center, 
      ${faceRgb} 0% 60%, 
      rgba(0,0,0,0) 0% 100%)`;

  // Neck
  let neckDimX = wholeRand(45, 30);
  let neck = `linear-gradient(to right, 
      rgba(0,0,0,0) 0% ${neckDimX}%, 
      ${faceRgb} 0% ${100 - neckDimX}%, 
      rgba(0,0,0,0) 0% 100%)`;

  // Build
  for (let i = 0; i < classes.length; i++) {
    if (classes[i]) child.classList.add(classes[i]);
  }
  child.style.setProperty("--face-color", faceRgb);
  child.style.setProperty("--teeth-color", eyeRgb);
  child.style.setProperty("--teeth-pos", `${teeth}%`);
  child.style.setProperty("--smile-pos", `${smile}%`);
  child.style.background = `${eye}, ${eye}, ${ear}, ${ear}, ${head}, ${body}, ${neck}, ${bkg}`;
  child.style.backgroundSize = `
      ${eyeDimX}% ${eyeDimY}%, 
      ${eyeDimX}% ${eyeDimY}%, 
      ${earDimX}% ${earDimY}%, 
      ${earDimX}% ${earDimY}%, 
      ${headDimX}% ${headDimY}%, 
      ${headDimX + wholeRand(40)}% 200%, 
      100% 50%, 
      100%`;
  child.style.backgroundPosition = `
      ${Math.min(30, eyeDist)}% 40%, 
      ${Math.max(70, 100 - eyeDist)}% 40%,
      ${headDimX + earDimX / 2}% 45%, 
      ${100 - headDimX - earDimX / 2}% 45%, 
      center, 
      50% -68%, 
      0 100%,
      center`;
  child.style.backgroundRepeat = `no-repeat`;
  if (insertAt.childNodes.item(i)) {
    insertAt.replaceChild(child, insertAt.childNodes.item(i));
  } else {
    insertAt.appendChild(child);
  }
}
function regenClass(insertAt) {
  for (let i = 0; i < 12; i++) {
    createRandomGoblin(insertAt, i);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  let book = document.querySelector(".goblin-yearbook > .book");
  let cover = book.querySelector(".front-cover");
  let innerCover = book.querySelector(".inner-cover");
  let regen = document.querySelector(".goblin-yearbook button.regen");
  let page = book.querySelector(".page");
  for (let i = 0; i < 12; i++) {
    createRandomGoblin(page, i);
  }
  document.querySelector(
    ".goblin-yearbook .inner-cover p"
  ).innerHTML += ` ${new Date().getFullYear()}!`;
  function openBook() {
    cover.classList.add("page-flip", "slide");
    innerCover.classList.add("page-flip", "slide");
    book.classList.add("slide");
  }
  cover.addEventListener("click", () => {
    openBook();
  });
  cover.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") openBook();
  });
  regen.addEventListener("click", () => {
    regenClass(page);
  });
});

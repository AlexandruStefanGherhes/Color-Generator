const form = document.getElementById("form");
const colorIndividual = document.querySelectorAll(".color");
const colors = document.querySelector(".colors");
const colorName = document.querySelectorAll(".color-text");

setBg();
function setBg() {
  for (let i = 0; i < 5; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colorIndividual[i].style.background = "#" + randomColor;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const colorPicker = document.getElementById("color").value.slice(1);
  const groupSelector = document.getElementById("select").value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${groupSelector}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        colorIndividual[i].style.background = data.colors[i].hex.value;
        colorName[i].textContent = data.colors[i].hex.value;
      }
    });
});

colorIndividual.forEach((item) =>
  item.addEventListener("click", (e) => {
    const value = e.target.style.background;
    navigator.clipboard.writeText(value);
    if (value) {
      alert(`${value} has been copied`);
    }
  })
);

colorName.forEach((item) =>
  item.addEventListener("click", (e) => {
    const value = e.target.textContent;
    navigator.clipboard.writeText(value);
    if (value) {
      alert(`${value} has been copied`);
    }
  })
);

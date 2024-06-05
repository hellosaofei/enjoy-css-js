function setPrimaryColor() {
  const list = ["#3FB884", "#e74c3c", "#F01414"];
  const primaryColor = getRandomElement(list);
  const primaryColorRgb = hexToRgb(primaryColor);

  document.documentElement.style.setProperty(
    "--v2-color-primary",
    primaryColor
  );
  document.documentElement.style.setProperty(
    "--v2-color-primary-rgb",
    primaryColorRgb
  );

  for (let i = 1; i <= 9; i++) {
    const opacity = i / 10;
    document.documentElement.style.setProperty(
      `--v2-color-primary-opacity-${i}`,
      `rgba(${primaryColorRgb}, ${opacity})`
    );
  }
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `${r},${g},${b}`;
}
// // Example usage
// document.querySelector("button").addEventListener("click", () => {
//   setPrimaryColor("#e74c3c");
// });

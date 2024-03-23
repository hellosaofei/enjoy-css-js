let canvas = document.getElementById("canvas");
let increase_btn = document.getElementById("increase");
let decrease_btn = document.getElementById("decrease");
let clear_btn = document.getElementById("clear");
let save_btn = document.getElementById("save");
let size_span = document.getElementById("size");
let color_input = document.getElementById("color");

let ctx = canvas.getContext("2d");
//画笔是否已经落下
let isPressed = false;
//画笔的粗细
let size = +size_span.innerText;
//画笔颜色
color = color_input.value;
//画笔当前位置
let x, y;
//此处的offSetX/Y是鼠标相当于canvas元素左上角的位置
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isPressed = true;
});
document.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    let x2 = e.offsetX;
    let y2 = e.offsetY;
    //此处添加即画圆又画线条是因为只画线条会出现断断续续的情况，绘制实心圆使线条更加饱满
    drawCircle(x2, y2);
    drawLine(x, x2, y, y2);
    //绘制完线条之后，调整画笔当前位置为当前鼠标的坐标
    (x = x2), (y = y2);
  }
});
//定义绘制线条和实心圆的函数
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
function drawLine(x1, x2, y1, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
//更新画笔粗细
function update_size() {
  size_span.innerText = size;
}
// 调整画笔的粗细
decrease_btn.addEventListener("click", () => {
  size -= 2;
  if (size < 5) {
    size = 5;
  }
  update_size();
});
increase_btn.addEventListener("click", () => {
  size += 2;
  if (size > 25) {
    size = 25;
  }
  update_size();
});
//调整画笔颜色
color_input.addEventListener("change", (e) => {
  color = e.target.value;
});
//清除绘图区域
clear_btn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//保存绘图区域为图片
save_btn.addEventListener("click", () => {
  var imageDataUrl = canvas.toDataURL(); // 返回Base64编码的图像数据URL
  downloadURI(imageDataUrl, "output_image.png"); // 输入自定义的文件名及格式（此处为PNG）
});
// 如果想保存为文件，则可以通过以下代码来处理
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}

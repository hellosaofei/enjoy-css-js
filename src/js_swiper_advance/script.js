var doms = {
  carousel: document.querySelector(".carousel"),
  indicator: document.querySelectorAll(".indicator span"),
  arrowLeft: document.querySelector(".arrowLeft"),
  arrowRight: document.querySelector(".arrowRight"),
};
console.log(doms);

// 记录当前轮播图的索引
let currentIndex = 0;
// 轮播图数量
let count = doms.indicator.length;
/**
 * 用于改变DOM结构，以实现无缝轮播
 */
function init() {
  const firstCloneNode = doms.carousel.firstElementChild.cloneNode(true);
  const lastCloneNode = doms.carousel.lastElementChild.cloneNode(true);
  doms.carousel.appendChild(firstCloneNode);
  doms.carousel.insertBefore(lastCloneNode, doms.carousel.firstElementChild);

  lastCloneNode.style.marginLeft = "-100%";
}
init();

/**
 * 切换轮播图
 * @param {*} index
 */
function moveTo(index) {
  doms.carousel.style.transition = "0.6s";
  doms.carousel.style.transform = `translateX(-${index}00%)`;
  // 清除当前
  const activeSpan = document.querySelector(".indicator span.active");
  activeSpan.classList.remove("active");
  // 新增
  doms.indicator[index].classList.add("active");

  currentIndex = index;
}

doms.indicator.forEach((item, index) => {
  item.onclick = function () {
    moveTo(index);
  };
  // item.addEventListener("click", moveTo(index));
});

// 点击向左的按钮
function moveLeft() {
  if (currentIndex === 0) {
    // console.log("无缝轮播");
    doms.carousel.style.transition = "none";

    doms.carousel.style.transform = `translateX(-${count}00%)`;
    // 等待浏览器渲染：使其跳转到最后一张之后，再完成向左滚动的行为
    // 强制回流（详细说明见 README 文档）
    doms.carousel.clientHeight;
    moveTo(count - 1);
  } else {
    moveTo(currentIndex - 1);
  }
}
function moveRight() {
  if (currentIndex === count - 1) {
    // console.log("无缝轮播");
    doms.carousel.style.transition = "none";

    doms.carousel.style.transform = `translateX(100%)`;
    // 等待浏览器渲染：使其跳转到第一张，再完成向左滚动的行为
    // 强制回流
    doms.carousel.clientHeight;
    moveTo(0);
  } else {
    moveTo(currentIndex + 1);
  }
}

doms.arrowLeft.onclick = moveLeft;
doms.arrowRight.onclick = moveRight;

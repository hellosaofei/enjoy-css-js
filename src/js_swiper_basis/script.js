var doms = {
  carousel: document.querySelector(".carousel"),
  indicator: document.querySelectorAll(".indicator span"),
};
// console.log(doms);
/**
 * 切换轮播图
 * @param {*} index
 */
function moveTo(index) {
  doms.carousel.style.transform = `translateX(-${index}00%)`;
  // 清除当前
  const activeSpan = document.querySelector(".indicator span.active");
  activeSpan.classList.remove("active");
  // 新增
  doms.indicator[index].classList.add("active");
}

doms.indicator.forEach((item, index) => {
  item.onclick = function () {
    moveTo(index);
  };
  // item.addEventListener("click", moveTo(index));
});

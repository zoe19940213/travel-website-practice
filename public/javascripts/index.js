//nodes
const carouselInner = document.querySelector(".carousel-inner");
const slideLeftBtn = document.querySelector(".slide-left-btn");
const slideRightBtn = document.querySelector(".slide-right-btn");
const slideDots = document.querySelector(".slide-dots");

//variables
const slides = carouselInner.children;
const slides_position = [];
const framPerSecond = 20;
let currentSlideIndex = 0;

function defaultShow() {
  for (i = 0; i < slides.length; i++) {
    slides_position[i] = i * 100;
    slides[i].style.left = `${slides_position[i]}%`;
  }
}

function skipSlide(targetSlide) {
  const dist = (targetSlide - currentSlideIndex) * 100;
  const perDist = dist / framPerSecond;
  for (t = 0; t < framPerSecond; t++) {
    setTimeout(() => {
      slides_position.forEach((x, i, positions) => {
        positions[i] = x - perDist;
        slides[i].style.left = `${positions[i]}%`;
      });
    }, t * 20);
  }
  currentSlideIndex = targetSlide;
}

function showDots(amount) {
  let dotHtml = ``;
  for (i = 0; i < amount; i++) {
    if (i === 0) {
      dotHtml += `<div class="dot full" data-no='${i}'></div>`;
    } else {
      dotHtml += `<div class="dot" data-no='${i}'></div>`;
    }
  }
  slideDots.innerHTML = dotHtml;
}

function switchDot(currentSlide, targetSlide) {
  slideDots.children[currentSlide].classList.remove("full");
  slideDots.children[targetSlide].classList.add("full");
  skipSlide(targetSlide);
}

slideLeftBtn.addEventListener("click", (event) => {
  if (currentSlideIndex === 0) {
    return;
  } else {
    switchDot(currentSlideIndex, currentSlideIndex - 1);
  }
});
slideRightBtn.addEventListener("click", (event) => {
  if (currentSlideIndex === slides.length - 1) {
    return;
  } else {
    switchDot(currentSlideIndex, currentSlideIndex + 1);
  }
});
slideDots.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".dot")) {
    const targetSlide = Number(target.dataset.no);
    switchDot(currentSlideIndex, targetSlide);
  }
});

defaultShow();
showDots(slides.length);
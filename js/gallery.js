const items = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.querySelector(".custom-lightbox");
const content = document.querySelector(".lb-content");
const btnPrev = document.querySelector(".lb-prev");
const btnNext = document.querySelector(".lb-next");
const btnClose = document.querySelector(".lb-close");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  renderItem();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  content.innerHTML = "";
  document.body.style.overflow = "";
}

function renderItem() {
  content.innerHTML = "";
  const item = items[currentIndex];

  if (item.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = item.dataset.full || item.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    content.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    content.appendChild(img);
  }
}

items.forEach((item, i) => {
  item.addEventListener("click", () => openLightbox(i));
});

btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  renderItem();
});

btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  renderItem();
});

btnClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") btnNext.click();
  if (e.key === "ArrowLeft") btnPrev.click();
});